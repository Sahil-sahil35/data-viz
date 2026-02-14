# Interactive Python Data Visualization Course 🐍📊

An interactive web-based course for learning Python data visualization with matplotlib and seaborn. This course runs entirely in the browser using Pyodide - no installation required!

![Course Preview](https://img.shields.io/badge/Python-3.11-blue) ![Pyodide](https://img.shields.io/badge/Pyodide-0.24.1-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Course Content

This comprehensive course covers:

1. **Introduction to Data Visualization** - Fundamentals and setup
2. **Box Plots** - Visualize distributions with quartiles and outliers
3. **Violin Plots** - Combine box plots with kernel density estimation
4. **Scatter Plots** - Visualize relationships between two variables
5. **3D Scatter Plots** - Visualize three-dimensional data relationships
6. **Histograms** - Understand data distribution frequencies
7. **Count Plots** - Show counts of categorical observations
8. **Correlation Plots / Heatmaps** - Visualize variable correlations
9. **Pie Charts** - Display proportional data
10. **Error Bars** - Show uncertainty in measurements
11. **Final Practice Exercise** - Apply all learned concepts

## ✨ Features

- 🖥️ **Browser-based Python** - Run Python code directly in your browser using Pyodide
- 📝 **Interactive Code Editor** - Edit and run code with syntax highlighting
- 🎨 **Dark/Light Theme** - Toggle between themes for comfortable learning
- 📊 **Real-time Visualization** - See your plots rendered instantly
- 💾 **Progress Tracking** - Your progress is saved locally
- 📱 **Responsive Design** - Learn on desktop or mobile devices

## 🚀 Deploy to GitHub Pages

### Option 1: Quick Deploy (Recommended)

1. **Fork this repository** or create a new repository

2. **Push the code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Python Visualization Course"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions"
   - The site will be deployed automatically

4. **Access your course** at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Option 2: Manual Static Export

1. Build the static site:
   ```bash
   npm install
   npm run build
   ```

2. The static files will be in the `out` directory

3. Deploy to any static hosting service (Netlify, Vercel, GitHub Pages)

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ or Bun
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
python-viz-course/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main course page with all lessons
│   │   ├── layout.tsx        # Root layout with theme provider
│   │   └── globals.css       # Global styles
│   └── components/
│       └── ui/               # UI components (shadcn/ui)
├── public/                   # Static assets
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind CSS config
└── README.md                 # This file
```

## 🔧 Technology Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Python Runtime**: Pyodide (Python in WebAssembly)
- **Visualization**: matplotlib, seaborn
- **Code Highlighting**: react-syntax-highlighter

## 🎓 How to Use the Course

1. **Open the course** in your web browser
2. **Wait for Pyodide to load** (first load takes ~10 seconds)
3. **Read the concept explanation** for each lesson
4. **Review the syntax reference** to understand the code
5. **Run the example code** to see the visualization
6. **Modify the code** and re-run to experiment
7. **Complete the practice exercise** to test your understanding
8. **Mark lessons as complete** to track your progress
9. **Navigate between lessons** using the sidebar or navigation buttons

## 💡 Tips for Your Friend

- Start with the Introduction lesson to understand the basics
- Each lesson builds on previous concepts
- Don't skip the practice exercises - hands-on coding is the best way to learn!
- If plots don't render, check the error messages in the output
- Experiment with the code - that's how you learn!
- Progress is saved in your browser, so you can continue later

## 🐛 Troubleshooting

**Pyodide not loading?**
- Check your internet connection
- Clear browser cache and refresh
- Try a different browser (Chrome/Firefox recommended)

**Plots not showing?**
- Wait for Pyodide to fully load (loading indicator disappears)
- Check for Python errors in the output panel
- Make sure the code has all necessary imports

**Code not running?**
- Ensure there are no syntax errors
- Check that all required packages are imported
- Try resetting the code to the default example

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new lessons
- Improve documentation
- Submit pull requests

---

Made with ❤️ for learning Python data visualization
