const User = require("../model/usersModel");
const APIFeatures = require('../utils/ApiFeactures')



exports.registeruser = async (req, res, next) => {
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
  };


  exports.selectAllUsers = async (req, res, next) =>{
 
  
    const apifeatures = new APIFeatures(User.find(), req.query)
      .search()
      .filter()
      .paginate();
  
    const all_Users = await apifeatures.query;
  
    res.status(200).json({
      data: all_Users,
    });
  }


  exports.getSingleUser = async (req, res, next)=>{

    const {id} = req.params
    const user = await User.findById(id)
    if(!user)return res.status(404).json({message:"user not found !!"})

    res.status(200).json({
        success: true,
        user
    })
  }

  exports.UpdateUser = async(req, res, next)=>{
      const {id} = req.params

      const user =await User.findByIdAndUpdate(id, req.body , 
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
      )
      if(!user)return res.status(404).json({message:"user not found !!"})
      res.status(200).json({
          success:true,
          user
      })
  }
  exports.deleteUser = async(req, res, next)=>{
      const {id} = req.params

      const user =await User.findByIdAndDelete(id)
      if(!user)return res.status(404).json({message:"user not found !!"})
      res.status(200).json({
          success:true,
         message:"user successfully deleted"
      })
  }

  exports.authUser = async (req, res, next) => {
    const { username, password } = req.body;
    // check if the re fiels were entered
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
      return res.status(401).json({
          message:"invalid credentials"

      });
    }
  
    // check password is correct or not
  
    const IspasswordCorrect = await user.correctPassword(password);
  
    if (!IspasswordCorrect) {
        return res.status(401).json({
            message:"invalid credentials"
  
        });
    }
  
    // const token = user.getJwtToken()
    // res.status(200).json({
    //     success:true,
    //     token
    // })
    res.status(200).json({
        message:"authenticated user"
    })
  };
  