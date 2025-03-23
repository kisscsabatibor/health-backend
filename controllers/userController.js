import User from '../models/User.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.user.userId)
    res.json(response)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body
    const user = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
