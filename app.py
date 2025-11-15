"""
Etsy Keyword Research Tool
A web application for analyzing Etsy keywords and providing insights.
"""

from flask import Flask, render_template, request, jsonify
import re
from collections import Counter
import math

app = Flask(__name__)

class KeywordAnalyzer:
    """Analyzes keywords for Etsy search optimization"""
    
    def __init__(self):
        # Common Etsy-related keywords with higher search volume
        self.etsy_categories = [
            'handmade', 'vintage', 'craft', 'custom', 'personalized',
            'gift', 'jewelry', 'art', 'home', 'decor', 'wedding',
            'christmas', 'birthday', 'unique', 'rustic', 'boho'
        ]
        
    def analyze_keyword(self, keyword):
        """
        Main analysis function that returns comprehensive keyword data
        """
        keyword = keyword.lower().strip()
        
        if not keyword:
            return None
            
        # Calculate metrics
        search_volume = self._estimate_search_volume(keyword)
        difficulty = self._calculate_difficulty(keyword)
        estimated_earnings = self._estimate_earnings(search_volume, difficulty)
        related_keywords = self._generate_related_keywords(keyword)
        
        return {
            'keyword': keyword,
            'search_volume': search_volume,
            'difficulty': difficulty,
            'estimated_earnings': estimated_earnings,
            'related_keywords': related_keywords
        }
    
    def _estimate_search_volume(self, keyword):
        """
        Estimate monthly search volume based on keyword characteristics
        """
        words = keyword.split()
        word_count = len(words)
        
        # Base volume starts higher for shorter keywords
        base_volume = 10000 if word_count == 1 else 5000 if word_count == 2 else 2000
        
        # Boost for popular Etsy categories
        category_boost = sum(1 for cat in self.etsy_categories if cat in keyword)
        base_volume *= (1 + category_boost * 0.5)
        
        # Reduce for very long keywords (long-tail)
        if word_count > 4:
            base_volume *= 0.5
        
        # Add some variation based on keyword characteristics
        keyword_hash = sum(ord(c) for c in keyword)
        variation = (keyword_hash % 30) / 100  # 0-30% variation
        
        volume = int(base_volume * (1 + variation))
        
        return max(100, min(volume, 100000))  # Cap between 100 and 100k
    
    def _calculate_difficulty(self, keyword):
        """
        Calculate ranking difficulty (0-100 scale)
        Lower is easier, higher is harder
        """
        words = keyword.split()
        word_count = len(words)
        
        # Shorter keywords are generally more competitive
        base_difficulty = 80 if word_count == 1 else 60 if word_count == 2 else 40
        
        # Popular categories increase difficulty
        category_count = sum(1 for cat in self.etsy_categories if cat in keyword)
        base_difficulty += category_count * 10
        
        # Long-tail keywords (4+ words) are easier to rank for
        if word_count >= 4:
            base_difficulty -= 20
        
        # Special modifiers that reduce competition
        niche_modifiers = ['personalized', 'custom', 'handmade', 'vintage']
        if any(mod in keyword for mod in niche_modifiers):
            base_difficulty -= 5
        
        return max(1, min(base_difficulty, 100))
    
    def _estimate_earnings(self, search_volume, difficulty):
        """
        Estimate potential monthly earnings based on search volume and difficulty
        """
        # Conversion rate varies with difficulty (easier = higher conversion potential)
        conversion_rate = 0.02 * (100 - difficulty) / 100  # 0-2%
        
        # Average Etsy product price assumption
        avg_price = 25
        
        # Click-through rate from search
        ctr = 0.1 if difficulty < 50 else 0.05
        
        # Monthly earnings calculation
        potential_clicks = search_volume * ctr
        potential_sales = potential_clicks * conversion_rate
        estimated_revenue = potential_sales * avg_price
        
        return round(estimated_revenue, 2)
    
    def _generate_related_keywords(self, keyword):
        """
        Generate related keyword suggestions
        """
        words = keyword.split()
        related = []
        
        # Add category-based variations
        modifiers = ['handmade', 'custom', 'personalized', 'unique', 'vintage']
        for modifier in modifiers:
            if modifier not in keyword:
                related.append(f"{modifier} {keyword}")
        
        # Add occasion-based variations
        occasions = ['wedding', 'christmas', 'birthday', 'gift']
        for occasion in occasions:
            if occasion not in keyword:
                related.append(f"{keyword} {occasion}")
                related.append(f"{occasion} {keyword}")
        
        # Add material/style variations
        styles = ['rustic', 'modern', 'boho', 'minimalist']
        for style in styles:
            if style not in keyword and len(words) <= 2:
                related.append(f"{style} {keyword}")
        
        # Remove duplicates and limit to 10
        related = list(dict.fromkeys(related))[:10]
        
        return related


# Global analyzer instance
analyzer = KeywordAnalyzer()


@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')


@app.route('/analyze', methods=['POST'])
def analyze():
    """Analyze a keyword and return results"""
    data = request.get_json()
    keyword = data.get('keyword', '')
    
    if not keyword:
        return jsonify({'error': 'Please provide a keyword'}), 400
    
    result = analyzer.analyze_keyword(keyword)
    
    if result is None:
        return jsonify({'error': 'Invalid keyword'}), 400
    
    return jsonify(result)


if __name__ == '__main__':
    # Debug mode should only be enabled in development
    # Set to False for production deployment
    import os
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
