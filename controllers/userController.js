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
