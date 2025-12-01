-- Disable foreign key checks temporarily
SET session_replication_role = 'replica';

-- Clear existing data
TRUNCATE products, sub_categories, categories, users RESTART IDENTITY CASCADE;

-- Import categories
INSERT INTO categories (id, name, image, "createdAt", "updatedAt") VALUES
(25, 'كيماويات وأوساط زراعية', '/uploads/image-1764544978320-507138560.jpg', '2025-11-30 19:48:19.912+03', '2025-12-01 02:22:59.366+03'),
(26, 'مستلزمات ومعدات طبية', '/uploads/image-1764545023176-904129741.jpg', '2025-11-30 19:48:19.923+03', '2025-12-01 02:23:47.066+03'),
(27, 'مستلزمات مخبرية', '/images/category-lab-equipment.jpg', '2025-11-30 19:48:19.93+03', '2025-11-30 19:48:19.93+03'),
(28, 'أجهزة ومعدات قياس', '/images/slider-1.jpg', '2025-11-30 19:48:19.934+03', '2025-11-30 19:48:19.934+03'),
(29, 'معامل تعليمية', '/uploads/image-1764536101658-6257420.jpg', '2025-11-30 19:48:19.937+03', '2025-11-30 23:55:03.412+03');

-- Update sequence
SELECT setval('categories_id_seq', 29);

-- Re-enable foreign key checks
SET session_replication_role = 'origin';
