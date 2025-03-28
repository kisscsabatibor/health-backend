import Report from '../models/Report.js'

export const createReport = async (req, res) => {
  try {
    const { pulse, bloodPressure, weight, bloodSugar } = req.body

    const newReport = new Report({
      user: req.user.userId,
      pulse,
      bloodPressure,
      weight,
      bloodSugar,
    })

    await newReport.save()
    res.status(201).json(newReport)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.userId }).sort({
      createdAt: -1,
    })
    res.json(reports)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params

    const report = await Report.findById(id)

    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }

    if (report.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    await report.deleteOne()
    res.json({ message: 'Report deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
