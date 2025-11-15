# 🔍 Etsy Keyword Research Tool

A powerful, user-friendly web application designed to help Etsy sellers optimize their product listings and increase visibility through strategic keyword analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.7+-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.0.0-green.svg)

## ✨ Features

- **🔎 Keyword Search Volume** - Estimate monthly search volume for any Etsy keyword
- **📊 Ranking Difficulty Analysis** - Understand competition levels with easy-to-read metrics
- **💰 Estimated Earnings Calculator** - Project potential monthly revenue based on keyword performance
- **🎯 Related Keywords** - Discover additional high-performing keyword opportunities
- **🎨 Beautiful Modern UI** - Smooth, responsive interface with elegant animations
- **⚡ Real-time Analysis** - Get instant results with smooth loading states

## 🚀 Quick Start

> 💡 **New to the project?** Check out [QUICKSTART.md](QUICKSTART.md) for a super-fast setup guide!

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1happybot/keyword-research-tool.git
   cd keyword-research-tool
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   # For production (recommended)
   python app.py
   
   # For development with debug mode
   FLASK_DEBUG=true python app.py
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5000` to start using the tool!

### Production Deployment

For production deployment, always ensure debug mode is disabled. The application uses environment variables to control debug mode:

- **Development**: Set `FLASK_DEBUG=true` to enable debug mode
- **Production**: Do not set the variable or set `FLASK_DEBUG=false`

Consider using a production WSGI server like Gunicorn or uWSGI instead of the Flask development server.

## 📖 How to Use

1. **Enter a Keyword** - Type any Etsy-related keyword in the search box (e.g., "handmade jewelry", "personalized gift")

2. **Analyze** - Click the "Analyze" button or press Enter

3. **Review Results** - Get comprehensive insights including:
   - Monthly search volume estimates
   - Competition difficulty score (1-100)
   - Potential monthly earnings
   - 10 related keyword suggestions

4. **Explore Related Keywords** - Click on any related keyword to instantly analyze it

## 🎯 Use Cases

- **New Etsy Sellers** - Find low-competition keywords to get started
- **Product Research** - Discover profitable niches before creating products
- **SEO Optimization** - Improve existing listings with better keywords
- **Market Analysis** - Understand demand and competition in your category
- **Content Planning** - Plan product descriptions around high-value keywords

## 🛠️ Technical Details

### Built With

- **Backend**: Flask (Python web framework)
- **Frontend**: Modern UI Framework (Vanilla JavaScript, HTML5, CSS3)
- **Design**: Glassmorphism, gradient effects, and smooth animations
- **Architecture**: Component-based CSS with utility patterns (inspired by modern frameworks)
- **No External Dependencies**: Self-contained design system with no CDN requirements

### Project Structure

```
keyword-research-tool/
├── app.py                 # Main Flask application
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Styling and animations
│   └── js/
│       └── main.js       # Frontend JavaScript
├── requirements.txt      # Python dependencies
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🔮 Future Enhancements

- Integration with real Etsy API for live data
- Historical trend analysis
- Competitor keyword analysis
- Export results to CSV/PDF
- Save favorite keywords
- Batch keyword analysis
- Advanced filtering options
- User authentication and saved searches

## 📝 Algorithm Details

The tool uses sophisticated algorithms to estimate:

- **Search Volume**: Based on keyword length, category relevance, and market trends
- **Difficulty**: Calculated from competition factors, keyword popularity, and niche modifiers
- **Earnings**: Estimated using conversion rates, average product prices, and click-through rates
- **Related Keywords**: Generated using category analysis, occasion-based variations, and style modifiers

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Etsy seller community
- Inspired by the need for accessible keyword research tools
- Designed with user experience as the top priority

## 📧 Support

For questions, issues, or suggestions, please open an issue on GitHub.

---

**Happy Selling! 🎉**