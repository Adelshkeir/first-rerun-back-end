import express from 'express'

const router = express.Router()

// @desc    Login/Landing page
// @route   GET /
router.get('/admin', (req, res) => {
  res.send('admin')
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/category', async (req, res) => {
res.render('category')
})

export default router;