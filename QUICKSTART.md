# 🚀 Quick Start Guide

Get the Etsy Keyword Research Tool running in 3 minutes!

## Prerequisites

- Python 3.7+ installed on your system
- Internet connection (for initial setup)

## Installation & Running

### One-Line Setup (Unix/Mac)

```bash
git clone https://github.com/1happybot/keyword-research-tool.git && cd keyword-research-tool && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python app.py
```

### One-Line Setup (Windows)

```bash
git clone https://github.com/1happybot/keyword-research-tool.git && cd keyword-research-tool && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python app.py
```

### Step-by-Step

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/1happybot/keyword-research-tool.git
   cd keyword-research-tool
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   ```

3. **Activate Virtual Environment**
   
   **Windows:**
   ```bash
   venv\Scripts\activate
   ```
   
   **Mac/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Application**
   ```bash
   python app.py
   ```

6. **Open Your Browser**
   
   Navigate to: **http://localhost:5000**

## Usage

1. **Enter a keyword** in the search box (e.g., "handmade jewelry")
2. **Click "Analyze"** or press Enter
3. **View results**:
   - Search Volume
   - Ranking Difficulty
   - Estimated Earnings
   - Related Keywords
4. **Click any related keyword** to analyze it instantly!

## Quick Tips

- Try the example keywords for instant results
- Use Ctrl+K (Cmd+K on Mac) to focus the search box
- Press Escape to clear the search box
- Press Enter to analyze without clicking the button

## Troubleshooting

**Port 5000 already in use?**
```bash
# Kill the process on port 5000 (Mac/Linux)
lsof -ti:5000 | xargs kill -9

# Kill the process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Python not found?**
- Make sure Python 3.7+ is installed
- Try using `python3` instead of `python`

**Module not found errors?**
- Make sure you activated the virtual environment
- Run `pip install -r requirements.txt` again

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the code in `app.py` to understand the algorithm
- Customize the UI by editing files in `static/` and `templates/`

## Quick Examples to Try

- `handmade jewelry`
- `personalized gift`
- `wedding decor`
- `custom mug`
- `vintage art`
- `christmas ornament`

---

**Happy keyword researching! 🎉**
