import pandas as pd
import json

# Read Physics products
print("=== قراءة منتجات الفيزياء ===")
df_physics = pd.read_excel(
    r'C:\Users\nooo\Desktop\موقع-شركة-واقف-إنترناشيونال (4)\منتجات للأضافة\منتجات القسم الفرعي فيزياء  بداخل القسم الرئيسي معامل تعليمية.xlsx',
    header=4
)

# Get product names from the correct column
physics_products = []
for _, row in df_physics.iterrows():
    product_name = row['متطلبات معامل تعليمية'] if 'متطلبات معامل تعليمية' in row else row.iloc[4]
    if pd.notna(product_name) and str(product_name).strip() and str(product_name).strip() not in ['متطلبات معامل تعليمية', 'NaN']:
        physics_products.append(str(product_name).strip())

print(f"عدد منتجات الفيزياء: {len(physics_products)}")
print("أول 10 منتجات:")
for i, p in enumerate(physics_products[:10], 1):
    print(f"{i}. {p}")

# Read Biology products
print("\n=== قراءة منتجات الأحياء ===")
df_biology = pd.read_excel(
    r'C:\Users\nooo\Desktop\موقع-شركة-واقف-إنترناشيونال (4)\منتجات للأضافة\منتجات القسم الفرعي احياء بداخل القسم الرئيسي معامل تعليمية.xlsx',
    header=4
)

biology_products = []
for _, row in df_biology.iterrows():
    product_name = row['متطلبات معامل تعليمية'] if 'متطلبات معامل تعليمية' in row else row.iloc[4]
    if pd.notna(product_name) and str(product_name).strip() and str(product_name).strip() not in ['متطلبات معامل تعليمية', 'NaN']:
        biology_products.append(str(product_name).strip())

print(f"عدد منتجات الأحياء: {len(biology_products)}")
print("أول 10 منتجات:")
for i, p in enumerate(biology_products[:10], 1):
    print(f"{i}. {p}")

# Save to JSON
with open('physics_products.json', 'w', encoding='utf-8') as f:
    json.dump(physics_products, f, ensure_ascii=False, indent=2)

with open('biology_products.json', 'w', encoding='utf-8') as f:
    json.dump(biology_products, f, ensure_ascii=False, indent=2)

print(f"\n✅ تم حفظ {len(physics_products)} منتج فيزياء")
print(f"✅ تم حفظ {len(biology_products)} منتج أحياء")
