import pandas as pd
import json

# Read Excel file
df = pd.read_excel(r'C:\Users\nooo\Downloads\منتجات للأضافة\مجسمات .xlsx')

# Clean data - keep only rows with Model
df_clean = df.dropna(subset=['Model'])

products = []
for _, row in df_clean.iterrows():
    name = str(row['Name']).strip() if pd.notna(row['Name']) else ''
    model = str(row['Model']).strip()
    picture = str(row['Picture']).strip() if pd.notna(row['Picture']) else ''
    
    products.append({
        'name': name,
        'model': model,
        'picture': picture
    })

# Save to JSON
with open('products_temp.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"تم استخراج {len(products)} منتج")
for i, p in enumerate(products[:5], 1):
    print(f"{i}. {p['name']} - {p['model']}")
