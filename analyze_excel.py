#!/usr/bin/env python3
"""
Analyze Excel file to understand plant native/introduced data structure
"""

import pandas as pd
import sys
from pathlib import Path

def analyze_excel():
    try:
        excel_path = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/assets/Catalogo_Revision_Plantas_Nativas ACTUALIZACION.xlsx"

        # Read Excel file
        df = pd.read_excel(excel_path)

        print("🔍 Analyzing Excel file structure...")
        print("=" * 50)

        print(f"📊 Total rows: {len(df)}")
        print(f"📋 Columns: {list(df.columns)}")
        print()

        print("📝 First 5 rows:")
        print(df.head())
        print()

        print("📊 Data types:")
        print(df.dtypes)
        print()

        # Check the last column (should contain native/introduced info)
        last_col = df.columns[-1]
        print(f"🏷️ Last column '{last_col}' unique values:")
        print(df[last_col].value_counts())
        print()

        # Look for plant names/scientific names
        for col in df.columns:
            if any(keyword in col.lower() for keyword in ['nombre', 'name', 'cientifico', 'scientific', 'especie']):
                print(f"🌱 Plant name column '{col}' samples:")
                print(df[col].head(10).tolist())
                print()

        # Save sample data for reference
        sample_file = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/excel_sample.csv"
        df.head(10).to_csv(sample_file, index=False)
        print(f"💾 Sample data saved to: {sample_file}")

    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        print("Make sure pandas and openpyxl are installed:")
        print("pip install pandas openpyxl")

if __name__ == "__main__":
    analyze_excel()