const User = require("../model/usersModel");
const APIFeatures = require('../utils/ApiFeactures');
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");



exports.registeruser = catchAsyncErrors( async (req, res, next) => {
    const { firstname, lastname, gender, date_of_birth, password, username } = req.body;
       
    const newUSer = await User.create({
        firstname,
        lastname,
        gender,
        date_of_birth,
        password,
        username
    });
  

    res.status(200).json({
      success: true,
  
      newUSer,
    });
  });


  exports.selectAllUsers =  catchAsyncErrors(async (req, res, next) =>{
 
  
    const apifeatures = new APIFeatures(User.find(), req.query)
      .search()
      .filter()
      .paginate();
  
    const all_Users = await apifeatures.query;
  
    res.status(200).json({
      data: all_Users,
    });
  })


  exports.getSingleUser = catchAsyncErrors( async (req, res, next)=>{

    const {id} = req.params
    const user = await User.findById(id)
    if(!user)return next(new ErrorHandler("user not found !!", 400))

    res.status(200).json({
        success: true,
        user
    })
  })

  exports.UpdateUser =  catchAsyncErrors(async(req, res, next)=>{
      const {id} = req.params

      const user =await User.findByIdAndUpdate(id, req.body , 
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
      )
      if(!user)return next(new ErrorHandler("user not found !!", 400))
      res.status(200).json({
          success:true,
          user
      })
  })

  exports.deleteUser =  catchAsyncErrors(async(req, res, next)=>{
      const {id} = req.params

      const user =await User.findByIdAndDelete(id)
      console.log('lkjhjklkjh')
      
      if(!user)return next(new ErrorHandler("user not found !!", 400))

      res.status(200).json({
          success:true,
         message:"user successfully deleted"
      })
  })

  exports.authUser =  catchAsyncErrors(async (req, res, next) => {
    const { username, password } = req.body;
    // check if the fields were entered
    if (!username || !password) {
      return res.status(404).json({
         message:"please enter your credentials" 
      })
    }
  
    // if user exist find in d DB
    // const user = await User.find({email}).select('+password')
    const user = await User.findOne({ username }).select("+password");
  
    console.log(user);
  
    if (!user) {
      return next(new ErrorHandler("invalid credentials" , 400))
    }
  
    // check password is correct or not
  
    const IspasswordCorrect = await user.correctPassword(password);
    console.log(IspasswordCorrect)
  
    if (!IspasswordCorrect) {
        return next(new ErrorHandler("password incorrect" , 404))
       
    }
  
    // const token = user.getJwtToken()
    // res.status(200).json({
    //     success:true,
    //     token
    // })
    res.status(200).json({
        message:"authenticated user"
    })
  });
  