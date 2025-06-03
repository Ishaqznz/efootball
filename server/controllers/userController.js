const User = require('../model/User');
const bycrypt = require('bcrypt')
const Account = require('../model/Account');

const signup = async (req, res) => {
    try {
        const {fullName, phoneNumber, password } = req.body;

        const hashedPassword = await bycrypt.hash(password, 10);
        const userData = new User({ fullName, phoneNumber, password: hashedPassword });
        console.log(userData);

        await userData.save();
        req.session.user = userData._id;
        res.status(200).send({ message: 'Successfully created the user '});

    } catch (error) {
        console.log('error happened while creating the new user: ', error);
        res.status(500).send({ message: 'Server error! '});
    }
}

const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const findUser = await User.findOne({ phoneNumber });
        if (!findUser) {
            return res.status(400).send({ message: 'User not found!' });
        }
        const isMatch = await bycrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Incorrect password!'});
        }

        req.session.user = findUser._id;
        console.log('user session: ', req.session.user);
        
        return res.status(200).send({ message: 'Succesfully logged In' });
    } catch (error) {
        console.log('error while login: ', error);
        res.status(500).send({ message: 'Server error!' });
    }
}


const addAccount = async (req, res) => {
  try {

    const { description, price } = req.body;
    const { user } = req.session;

    const filesData = req.files.map(file => ({
      url: file.path,            
      public_id: file.filename,  
      fileType: file.mimetype.split('/')[0], 
    }));

    const newAccount = new Account({
      user,
      description,
      price,
      files: filesData,
    });

    const savedAccount = await newAccount.save();

    res.status(201).json({
      message: 'Account data saved successfully',
      account: savedAccount,
    });
  } catch (error) {
    console.error('Error happened while adding the account: ', error);
    res.status(500).json({ error: 'Server error while saving account data' });
  }
};

const loadAccounts = async (req, res) => {
  try {
    const findAccounts = await Account.find();
    if (findAccounts) {
      res.status(200).json({ accountDatas: findAccounts, message: 'Successfully fetched the data! '});
      return;
    }

    return res.status(500).json({ accountDatas: null, message: 'No available accounts!' });
  } catch (error) {
    console.log('Error happened while fetching accounts: ', error);
    res.status(500).json({ message: 'Server error! '});
  }
}

const getAccount = async (req, res) => {
  try {
    const { id } = req.params
    console.log('id from the front end: ', id);
    const findAccount = await Account.findById(id);

    console.log('find account: ', findAccount);

    if (!findAccount) {
      return res.status(400).send({ message: 'Account not found! '});
    }
    res.status(200).send({ accountData: findAccount, message: 'Successfully fetched the data! '})
  } catch (error) {
    console.log('Error while fetching the data: ', error);
    res.status(500).send({ message: 'Server error! '});
  }
}

const getUserStatus = async (req, res) => {
  try {
    const userId = req.session.user
    const findUser = await User.findById(userId);

    console.log("It's coming here with user data: ", findUser);
    
    if (findUser) {
      return res.status(200).json({ message: 'Successfully fetched the user data!', userData: findUser });
    }
    res.status(400).json({ message: 'User not found! '});
  } catch (error) {
    console.log('Error while getting the user data: ', error);
    res.status(500).json({ message: 'Server error! '});
  }
}

const getUserAccounts = async (req, res) => {
  try {
    const { id } = req.params;
    const userAccounts = await Account.find({ user: id });
    if (!userAccounts) {
      return res.status(400).json({ message: 'No accounts found! '});
    }

    res.status(200).json({ message: userAccounts });
  } catch (error) {
    console.log('Error while getting the user accounts: ', error);
    res.status(500).json({ message: 'Server errro! '});
  }
}

const logout = (req, res) => {
  try {
    req.session.user = null;
    return res.status(200).json({ message: 'Successfully logout! '});
  } catch (error) {
    console.log('Error while logout the user: ', error);
    res.status(500).json({ message: 'Server error! '});
  }
}


module.exports = {
    signup,
    login,
    addAccount,
    loadAccounts,
    getAccount,
    getUserStatus,
    getUserAccounts,
    logout
}