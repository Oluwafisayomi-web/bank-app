const User = require("../models/User");
const Transaction = require("../models/Transaction");

// SEND MONEY
const sendMoney = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ accountNumber });

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    if (sender.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    sender.balance -= Number(amount);
    receiver.balance += Number(amount);

    await sender.save();
    await receiver.save();

    const transaction = await Transaction.create({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      type: "transfer",
    });

    res.status(200).json({
      message: "Transfer successful",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// 💰 DEPOSIT MONEY (NEW FIX YOU NEED)
const depositMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.balance += Number(amount);

    await user.save();

    const transaction = await Transaction.create({
      receiver: user._id,
      amount,
      type: "deposit",
    });

    res.status(200).json({
      message: "Deposit successful",
      balance: user.balance,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// WITHDRAW MONEY
const withdrawMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const user = await User.findById(req.user.id);

    if (user.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    user.balance -= Number(amount);

    await user.save();

    const transaction = await Transaction.create({
      sender: user._id,
      amount,
      type: "withdrawal",
    });

    res.status(200).json({
      message: "Withdrawal successful",
      balance: user.balance,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET TRANSACTION HISTORY
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id },
      ],
    })
      .populate("sender", "name accountNumber")
      .populate("receiver", "name accountNumber")
      .sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  sendMoney,
  withdrawMoney,
  depositMoney, // ✅ IMPORTANT ADDITION
  getTransactions,
};