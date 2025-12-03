
       // ====== Danh sách sản phẩm ======
        const productsData = [
            { id: 1, category: "dienthoai", name: "iPhone 15 Pro Max 256GB", brand: "apple", storage: "256GB", ram: "8GB", price: 28990000, oldPrice: 32990000, rating: 5, specs: "6.7\" | A17 Pro | 256GB", badge: "sale", image: "img/iphone-15-pro-max-8Gb-256Gb-Goc1.jpg",
            description: `
            <h3>iPhone 15 Pro Max - Đỉnh cao công nghệ từ Apple</h3>
            <p>iPhone 15 Pro Max là smartphone cao cấp nhất của Apple với thiết kế titan sang trọng, chip A17 Pro mạnh mẽ và hệ thống camera chuyên nghiệp.</p>
            <h4>Điểm nổi bật:</h4>
            <ul>
                <li>Chip A17 Pro 3nm - Hiệu năng vượt trội</li>
                <li>Camera 48MP với telephoto 5x</li>
                <li>Màn hình Super Retina XDR 6.7 inch</li>
                <li>Khung viền Titan Grade 5 siêu bền</li>
                <li>Cổng USB-C với tốc độ truyền USB 3.0</li>
                <li>Pin 4422mAh, sạc nhanh 20W</li>
            </ul>
        `,
        specs: {
            "Màn hình": "6.7 inch, Super Retina XDR OLED, 2796 x 1290 pixels, 120Hz",
            "Chip xử lý": "Apple A17 Pro (3nm), 6 nhân CPU, 6 nhân GPU",
            "RAM": "8GB",
            "Bộ nhớ trong": "256GB",
            "Camera sau": "48MP chính + 12MP ultra wide + 12MP telephoto (5x zoom)",
            "Camera trước": "12MP, TrueDepth",
            "Pin": "4422mAh, sạc nhanh 20W, sạc không dây MagSafe 15W",
            "Hệ điều hành": "iOS 17",
            "Kết nối": "5G, WiFi 6E, Bluetooth 5.3, NFC",
            "Chất liệu": "Khung Titan Grade 5, mặt lưng kính Ceramic Shield",
            "Kháng nước": "IP68 (6m trong 30 phút)",
            "Trọng lượng": "221g"
        },
    },
            { id: 2, category: "dienthoai", name: "iPhone 15 128GB", brand: "apple", storage: "128GB", ram: "6GB", price: 22990000, oldPrice: 26990000, rating: 4, specs: "6.1\" | A16 Bionic | 128GB", badge: "new", image: "img/iphone-15-xanh-6Gb-128Gb-Goc1.jpg",
                description: `
                <h3>iPhone 15 – Trải nghiệm mượt mà, thiết kế thời thượng</h3>
                <p>iPhone 15 mang đến sự nâng cấp mạnh mẽ với Dynamic Island, camera 48MP và cổng USB-C, kết hợp cùng thiết kế màu pastel đẹp mắt.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Chip A16 Bionic – Hiệu năng mạnh mẽ, tiết kiệm pin</li>
                    <li>Camera chính 48MP chụp ảnh sắc nét</li>
                    <li>Màn hình Super Retina XDR 6.1 inch</li>
                    <li>Dynamic Island – Hiển thị thông minh</li>
                    <li>Cổng USB-C tiện lợi</li>
                    <li>Thiết kế khung nhôm & mặt lưng kính màu đẹp mắt</li>
                </ul>
            `,
            specs: {
                "Màn hình": "6.1 inch, Super Retina XDR OLED, 2556 × 1179 pixels",
                "Chip xử lý": "Apple A16 Bionic",
                "RAM": "6GB",
                "Bộ nhớ trong": "128GB",
                "Camera sau": "48MP chính + 12MP góc rộng",
                "Camera trước": "12MP TrueDepth",
                "Pin": "Khoảng 3349mAh, sạc nhanh 20W",
                "Hệ điều hành": "iOS 17",
                "Kết nối": "5G, WiFi 6, Bluetooth 5.3, NFC, USB-C",
                "Chất liệu": "Khung nhôm, mặt lưng kính pha màu",
                "Kháng nước": "IP68",
                "Trọng lượng": "171g"
            },
        },
            { id: 3, category: "dienthoai", name: "Galaxy S24 Ultra 512GB", brand: "samsung", storage: "512GB", ram: "12GB", price: 29990000, oldPrice: 34990000, rating: 5, specs: "6.8\" | Snapdragon 8 Gen 3 | 512GB", badge: "sale", image: "img/samsung-galaxy-s24-ultra.jpg",
                description: `
                <h3>Galaxy S24 Ultra – Flagship đỉnh cao với hiệu năng vượt trội</h3>
                <p>Galaxy S24 Ultra sở hữu thiết kế sang trọng với khung Titanium siêu bền, màn hình Dynamic AMOLED 2X sắc nét và hiệu năng mạnh mẽ nhờ Snapdragon 8 Gen 3. Camera 200MP cho khả năng chụp ảnh vượt trội cùng nhiều công nghệ AI thông minh.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Chip Snapdragon 8 Gen 3 – Hiệu năng mạnh nhất của Samsung</li>
                    <li>Camera 200MP – Zoom 100X sắc nét</li>
                    <li>Màn hình Dynamic AMOLED 2X 6.8 inch – 120Hz mượt mà</li>
                    <li>Khung Titanium bền bỉ, mặt kính Gorilla Armor</li>
                    <li>Pin 5000mAh – Sạc nhanh 45W</li>
                    <li>Hỗ trợ S-Pen tiện lợi</li>
                </ul>
                 `,

                specs: {
                "Màn hình": "6.8 inch Dynamic AMOLED 2X, QHD+, 120Hz, độ sáng 2600 nits",
                "Chip xử lý": "Snapdragon 8 Gen 3",
                "RAM": "12GB",
                "Bộ nhớ trong": "512GB UFS 4.0",
                "Camera sau": "200MP (chính) + 12MP (góc rộng) + 10MP (tele 3X) + 50MP (tele 5X)",
                "Camera trước": "12MP",
                "Pin": "5000mAh, sạc nhanh 45W, sạc không dây",
                "Hệ điều hành": "Android 14, OneUI 6",
                "Kết nối": "5G, WiFi 7, Bluetooth 5.3, USB-C",
                "Chất liệu": "Khung Titanium, mặt kính Gorilla Armor",
                "Kháng nước": "IP68",
                "Trọng lượng": "232g",
                "Tính năng đặc biệt": "Hỗ trợ S-Pen, Zoom 100x, AI cải thiện ảnh"
                }
            },
            { id: 4, category: "dienthoai", name: "Galaxy A54 128GB", brand: "samsung", storage: "128GB", ram: "8GB", price: 9990000, oldPrice: null, rating: 4, specs: "6.5\" | Exynos 1380 | 128GB", badge: null, image: "img/samsung-galaxy-a54-5g-8Gb-128Gb-Goc1.jpg",
                description: `
                <h3>Galaxy A54 – Thiết kế trẻ trung, hiệu năng mạnh trong tầm giá</h3>
                <p>Samsung Galaxy A54 nổi bật với màn hình Super AMOLED 120Hz, camera 50MP chống rung OIS và viên pin 5000mAh bền bỉ. Chiếc máy đem lại trải nghiệm ổn định, phù hợp cho học tập, làm việc và giải trí.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Màn hình Super AMOLED 6.5 inch – 120Hz siêu mượt</li>
                    <li>Camera 50MP OIS – Chụp ảnh cực nét</li>
                    <li>Chip Exynos 1380 – Hiệu năng tối ưu</li>
                    <li>Pin 5000mAh – Sạc nhanh 25W</li>
                    <li>Kháng nước IP67</li>
                    <li>Thiết kế hiện đại, nhiều màu trẻ trung</li>
                </ul>
                 `,

                specs: {
                "Màn hình": "6.5 inch Super AMOLED, Full HD+, 120Hz",
                "Chip xử lý": "Exynos 1380",
                "RAM": "8GB",
                "Bộ nhớ trong": "128GB (hỗ trợ thẻ nhớ 1TB)",
                "Camera sau": "50MP (chính OIS) + 12MP (góc rộng) + 5MP (macro)",
                "Camera trước": "32MP",
                "Pin": "5000mAh, sạc nhanh 25W",
                "Hệ điều hành": "Android 14, OneUI 6",
                "Kết nối": "5G, WiFi 6, Bluetooth 5.3, NFC",
                "Chất liệu": "Khung nhựa, mặt lưng kính",
                "Kháng nước": "IP67",
                "Trọng lượng": "202g",
                "Tính năng đặc biệt": "Chống rung OIS, loa kép Stereo"
                }
             },
            { id: 5, category: "dienthoai", name: "Reno10 Pro 256GB", brand: "oppo", storage: "256GB", ram: "12GB", price: 15990000, oldPrice: 19990000, rating: 4, specs: "6.7\" | Snapdragon 8 Gen 2 | 256GB", badge: "sale", image: "img/oppo-reno10-pro-tim-12Gb-256Gb-Goc1.jpg",
                 description: `
                <h3>Oppo Reno10 Pro – Chân dung đẹp hoàn hảo với camera Tele 32MP</h3>
                <p>Oppo Reno10 Pro sở hữu thiết kế cong sang trọng, màn hình AMOLED 120Hz và khả năng chụp ảnh chân dung xuất sắc với camera Tele 32MP. Máy mang lại hiệu năng mạnh mẽ và sạc siêu nhanh 80W.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Camera Tele 32MP – Chân dung tự nhiên</li>
                    <li>Màn hình AMOLED 6.7 inch – 120Hz</li>
                    <li>Chip Snapdragon 8 Gen 2 mạnh mẽ</li>
                    <li>Sạc nhanh SuperVOOC 80W</li>
                    <li>Thiết kế cong sang trọng, mỏng nhẹ</li>
                    <li>Pin 4600mAh bền bỉ</li>
                </ul>
                 `,


                specs: {
                "Màn hình": "6.7 inch AMOLED cong, Full HD+, 120Hz",
                "Chip xử lý": "Snapdragon 8 Gen 2",
                "RAM": "12GB",
                "Bộ nhớ trong": "256GB",
                "Camera sau": "50MP (chính OIS) + 8MP (góc rộng) + 32MP (tele chân dung)",
                "Camera trước": "32MP",
                "Pin": "4600mAh, sạc nhanh SuperVOOC 80W",
                "Hệ điều hành": "Android 14, ColorOS 14",
                "Kết nối": "5G, WiFi 6, Bluetooth 5.3, NFC",
                "Chất liệu": "Khung nhôm, mặt lưng kính",
                "Trọng lượng": "186g",
                "Kháng nước": "IP54",
                "Tính năng đặc biệt": "Tele Portrait 2X, HDR, AI Beauty"
                }


             },
            { id: 6, category: "dienthoai", name: "Xiaomi 13T Pro 512GB", brand: "xiaomi", storage: "512GB", ram: "12GB", price: 17990000, oldPrice: 20990000, rating: 5, specs: "6.67\" | Dimensity 9200+ | 512GB", badge: "hot", image: "img/Xiaomi-13T-Pro-512GB-12Gb-Goc1.jpg",
                 description: `
                <h3>Xiaomi 13T Pro – Hiệu năng đẳng cấp, camera Leica chuyên nghiệp</h3>
                <p>Xiaomi 13T Pro mang đến trải nghiệm mạnh mẽ nhờ chip Dimensity 9200+ và hệ thống camera Leica cao cấp. Màn hình AMOLED 144Hz cho độ mượt vượt trội, kết hợp cùng sạc nhanh 120W giúp bạn nạp đầy năng lượng trong thời gian ngắn.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Camera Leica – Ảnh màu sắc chân thực</li>
                    <li>Chip Dimensity 9200+ mạnh mẽ</li>
                    <li>Màn hình AMOLED 144Hz – Siêu mượt</li>
                    <li>Sạc nhanh 120W – Đầy pin trong 20 phút</li>
                    <li>Chuẩn kháng nước IP68</li>
                    <li>Dung lượng 512GB thoải mái lưu trữ</li>
                </ul>
                 `,


                specs: {
                "Màn hình": "6.67 inch AMOLED, 1.5K, 144Hz, 2600 nits",
                "Chip xử lý": "MediaTek Dimensity 9200+",
                "RAM": "12GB",
                "Bộ nhớ trong": "512GB UFS 4.0",
                "Camera sau": "50MP Leica (chính) + 50MP (tele 2X) + 12MP (góc rộng)",
                "Camera trước": "20MP",
                "Pin": "5000mAh, sạc nhanh 120W",
                "Hệ điều hành": "Android 14, MIUI 14",
                "Kết nối": "5G, WiFi 6E, Bluetooth 5.3, NFC",
                "Chất liệu": "Khung kim loại, mặt lưng kính hoặc da",
                "Kháng nước": "IP68",
                "Trọng lượng": "206g",
                "Tính năng đặc biệt": "Camera Leica Authentic/Vibrant, HyperCharge 120W"
                }

             },
            { id: 7, category: "dienthoai", name: "Vivo V29 256GB", brand: "vivo", storage: "256GB", ram: "8GB", price: 11990000, oldPrice: 13990000, rating: 4, specs: "6.78\" | Snapdragon 778G+ | 256GB", badge: null, image: "img/vivo-v29e-tim-8Gb-256Gb-Goc1.jpg",
                description: `
               <h3>Vivo V29 – Chân dung đẹp xuất sắc với Aura Light 2.0</h3>
                <p>Vivo V29 được trang bị đèn Aura Light 2.0 giúp chụp ảnh chân dung ấn tượng ngay cả trong điều kiện thiếu sáng. Máy có màn hình AMOLED cong 120Hz mượt mà cùng hiệu năng ổn định từ Snapdragon 778G+.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Aura Light 2.0 – Chân dung đẹp hơn</li>
                    <li>Màn hình AMOLED cong 6.78 inch – 120Hz</li>
                    <li>Camera trước 50MP lấy nét tự động</li>
                    <li>Chip Snapdragon 778G+ ổn định</li>
                    <li>Sạc nhanh 80W</li>
                    <li>Thiết kế mỏng nhẹ, sang trọng</li>
                </ul>
                 `,

               
                specs: {
                "Màn hình": "6.78 inch AMOLED cong, Full HD+, 120Hz",
                "Chip xử lý": "Snapdragon 778G+",
                "RAM": "8GB",
                "Bộ nhớ trong": "256GB",
                "Camera sau": "50MP (chính OIS) + 8MP (góc rộng) + 2MP (macro)",
                "Camera trước": "50MP AutoFocus",
                "Pin": "4600mAh, sạc nhanh 80W",
                "Hệ điều hành": "Android 14, FuntouchOS 14",
                "Kết nối": "5G, WiFi 6, Bluetooth 5.2",
                "Chất liệu": "Khung nhựa, mặt lưng kính",
                "Kháng nước": "IP54",
                "Trọng lượng": "186g",
                "Tính năng đặc biệt": "Aura Light 2.0, chân dung thiếu sáng"
                }

             },
            { id: 8, category: "dienthoai", name: "iPhone SE 64GB", brand: "apple", storage: "64GB", ram: "4GB", price: 10990000, oldPrice: null, rating: 3, specs: "4.7\" | A15 Bionic | 64GB", badge: null, image: "img/iphone-se-2020-red-4Gb-64Gb-Goc1.jpg",
                 description: `
                <h3>iPhone SE 2022 – Nhỏ gọn, mạnh mẽ với chip A15 Bionic</h3>
                <p>iPhone SE 2022 đem tới sức mạnh đáng kinh ngạc trong một thiết kế nhỏ gọn cổ điển. Chip A15 Bionic giúp xử lý cực nhanh mọi tác vụ, trong khi Touch ID mang lại sự tiện lợi quen thuộc.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Chip A15 Bionic – Hiệu năng flagship</li>
                    <li>Màn hình Retina HD 4.7 inch nhỏ gọn</li>
                    <li>Camera 12MP – Chụp ảnh sắc nét</li>
                    <li>Kháng nước chuẩn IP67</li>
                    <li>Touch ID tiện lợi</li>
                    <li>Thiết kế bền bỉ, nhẹ</li>
                </ul>
                 `,

                
                specs: {
                "Màn hình": "4.7 inch Retina HD",
                "Chip xử lý": "Apple A15 Bionic",
                "RAM": "4GB",
                "Bộ nhớ trong": "64GB",
                "Camera sau": "12MP f/1.8",
                "Camera trước": "7MP",
                "Pin": "2018mAh, sạc nhanh 20W",
                "Hệ điều hành": "iOS 17",
                "Kết nối": "4G/5G, WiFi 6, Bluetooth 5.0",
                "Chất liệu": "Khung nhôm, mặt kính",
                "Kháng nước": "IP67",
                "Trọng lượng": "144g",
                "Tính năng đặc biệt": "Touch ID, chip flagship A15"
                }

             },
            { id: 9, category: "dienthoai", name: "Galaxy Z Fold5 1TB", brand: "samsung", storage: "1TB", ram: "12GB", price: 37990000, oldPrice: 40990000, rating: 5, specs: "7.6\" | Snapdragon 8 Gen 2 | 1TB", badge: "sale", image: "img/samsung-galaxy-z-fold5-12Gb-1Tb-Goc1.jpg",
                 description: `
                <h3>Galaxy Z Fold5 – Đỉnh cao công nghệ smartphone gập</h3>
                <p>Galaxy Z Fold5 mang đến không gian làm việc rộng với màn hình gập 7.6 inch, kết hợp chipset Snapdragon 8 Gen 2 mạnh mẽ. Bản lề Flex thế hệ mới chắc chắn hơn, giúp trải nghiệm gập mở liền mạch.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Màn hình chính 7.6 inch – Không gian làm việc rộng rãi</li>
                    <li>Chip Snapdragon 8 Gen 2 – Hiệu năng cao</li>
                    <li>Bản lề Flex mới bền hơn</li>
                    <li>Đa nhiệm 3 cửa sổ tối ưu</li>
                    <li>Bộ nhớ 1TB – Lưu trữ thoải mái</li>
                    <li>Thiết kế sang trọng, gập mở mượt mà</li>
                </ul>
                 `,

                
                specs: {
                "Màn hình": "7.6 inch Dynamic AMOLED 2X chính | 6.2 inch AMOLED ngoài, 120Hz",
                "Chip xử lý": "Snapdragon 8 Gen 2 for Galaxy",
                "RAM": "12GB",
                "Bộ nhớ trong": "1TB",
                "Camera sau": "50MP (chính OIS) + 12MP (góc rộng) + 10MP (tele 3X)",
                "Camera trước": "10MP (ngoài) + 4MP (trong UDC)",
                "Pin": "4400mAh, sạc 25W",
                "Hệ điều hành": "Android 14, OneUI 6",
                "Kết nối": "5G, WiFi 6E, Bluetooth 5.3, USB-C",
                "Chất liệu": "Khung Armor Aluminum, mặt kính Gorilla Victus 2",
                "Kháng nước": "IPX8",
                "Trọng lượng": "253g",
                "Tính năng đặc biệt": "Flex Mode, đa nhiệm 3 cửa sổ"
                }

             },
            { id: 10, category: "dienthoai", name: "Xiaomi Redmi Note 12 128GB", brand: "xiaomi", storage: "128GB", ram: "4GB", price: 4990000, oldPrice: 5990000, rating: 4, specs: "6.67\" | Snapdragon 685 | 128GB", badge: null, image: "img/xiaomi-redmi-note-12-vang-1-8Gb-128Gb-Goc1.jpg",
                 description: `
                <h3>Redmi Note 12 – Giá rẻ nhưng mạnh mẽ với màn hình AMOLED 120Hz</h3>
                <p>Xiaomi Redmi Note 12 nổi bật trong phân khúc với màn hình AMOLED 120Hz hiếm có, hiệu năng ổn định từ Snapdragon 685 và viên pin 5000mAh cho thời gian sử dụng dài.</p>
                <h4>Điểm nổi bật:</h4>
                <ul>
                    <li>Màn hình AMOLED 6.67 inch – 120Hz mượt mà</li>
                    <li>Chip Snapdragon 685 ổn định</li>
                    <li>Camera 50MP – Chụp ảnh chi tiết</li>
                    <li>Pin 5000mAh – Sạc nhanh 33W</li>
                    <li>Thiết kế trẻ trung, bền bỉ</li>
                    <li>Giá rẻ nhưng nhiều tính năng nổi bật</li>
                </ul>
                 `,


                specs: {
                "Màn hình": "6.67 inch AMOLED, Full HD+, 120Hz",
                "Chip xử lý": "Snapdragon 685",
                "RAM": "4GB",
                "Bộ nhớ trong": "128GB",
                "Camera sau": "50MP (chính) + 8MP (góc rộng) + 2MP (macro)",
                "Camera trước": "13MP",
                "Pin": "5000mAh, sạc nhanh 33W",
                "Hệ điều hành": "Android 13, MIUI 14",
                "Kết nối": "4G, WiFi 5, Bluetooth 5.0",
                "Chất liệu": "Khung nhựa, mặt lưng nhựa",
                "Kháng nước": "IP53",
                "Trọng lượng": "188g",
                "Tính năng đặc biệt": "Màn hình AMOLED 120Hz trong tầm giá"
                }

             },
            { id: 11, category: "dienthoai", name: "iPhone 14 Pro 128GB", brand: "apple", storage: "128GB", ram: "6GB", price: 23990000, oldPrice: 27990000, rating: 5, specs: "6.1\" | A16 Bionic | 128GB", badge: "sale", image: "img/iphone-14-pro-vang-thumb-6Gb-128Gb-Goc1.jpg",
                 description: `
                  `,
             },
            { id: 12, category: "dienthoai", name: "samsung-s23-fe", brand: "samsung", storage: "256GB", ram: "8GB", price: 14990000, oldPrice: 15990000, rating: 4, specs: "6.4\" | Exynos 2200 | 256GB", badge: "new", image: "img/samsung-galaxy-s23-fe-trang-cu.jpg",
              description: `
               `,
             },
            { id: 13, category: "dienthoai", name: "Oppo A78 4G 128GB", brand: "oppo", storage: "128GB", ram: "8GB", price: 6990000, oldPrice: null, rating: 3, specs: "6.43\" | Snapdragon 680 | 128GB", badge: null, image: "img/Oppo-A78-4G-6.43-inch-8GB-RAM-128GB-Storage-Goc1.jpg",
                 description: `
                  `,
             },
            { id: 14, category: "dienthoai", name: "Realme C53 128GB", brand: "realme", storage: "128GB", ram: "6GB", price: 4490000, oldPrice: null, rating: 3, specs: "6.74\" | Unisoc T612 | 128GB", badge: "hot", image: "img/realme-c53-gold-1-6Gb-128Gb-Goc1.jpg",
                 description: `
                  `,
             },
            { id: 15, category: "dienthoai", name: "Sony Xperia 5 V 256GB", brand: "sony", storage: "256GB", ram: "8GB", price: 24990000, oldPrice: null, rating: 4, specs: "6.1\" | Snapdragon 8 Gen 2 | 256GB", badge: "new", image: "img/Sony-Xperia-5-V-256GB-Goc1.jpg",
                description: `
                  `,
             },
            { id: 16, category: "dienthoai", name: "Google Pixel 8 128GB", brand: "google", storage: "128GB", ram: "8GB", price: 18990000, oldPrice: 20990000, rating: 5, specs: "6.2\" | Tensor G3 | 128GB", badge: "sale", image: "img/google-pixel-8-5g-hazel-128gb-Goc1.jpg",
                description: `
                  `,
             },
            { id: 17, category: "dienthoai", name: "Samsung Galaxy Z Flip5 256GB", brand: "samsung", storage: "256GB", ram: "8GB", price: 25990000, oldPrice: 27990000, rating: 5, specs: "6.7\" | Snapdragon 8 Gen 2 | 256GB", badge: "sale", image: "img/samsung-galaxy-z-flip5-kem-4_2.jpg",
                description: `
                  `,
             },
            { id: 18, category: "dienthoai", name: "Xiaomi 14 Ultra 512GB", brand: "xiaomi", storage: "512GB", ram: "16GB", price: 30990000, oldPrice: null, rating: 5, specs: "6.73\" | Snapdragon 8 Gen 3 | 512GB", badge: "new", image: "img/xiaomi-14-ultra-black-16Gb-512Gb-Goc1.jpg" },
            { id: 19, category: "dienthoai", name: "Motorola Edge 40 Neo 256GB", brand: "motorola", storage: "256GB", ram: "12GB", price: 10990000, oldPrice: 12990000, rating: 4, specs: "6.55\" | Dimensity 920 | 256GB", badge: "sale", image: "img/Motorola-Edge-40-Neo-256GB-Goc1.jpg" },
            { id: 20, category: "dienthoai", name: "Nokia G400 5G 128GB", brand: "nokia", storage: "128GB", ram: "6GB", price: 5990000, oldPrice: null, rating: 3, specs: "6.6\" | Snapdragon 480+ | 128GB", badge: null, image: "img/nokia-g400-5g-6Gb-128Gb-Goc2.jpg" },
            { id: 21, category: "dienthoai", name: "iPhone 13 mini 128GB", brand: "apple", storage: "128GB", ram: "4GB", price: 16990000, oldPrice: 18990000, rating: 4, specs: "5.4\" | A15 Bionic | 128GB", badge: "sale", image: "img/iphone-13-mini-red-4Gb-128Gb-Goc2.jpg" },
            { id: 22, category: "dienthoai", name: "Vivo Y36 128GB", brand: "vivo", storage: "128GB", ram: "8GB", price: 6590000, oldPrice: 7290000, rating: 3, specs: "6.64\" | Snapdragon 680 | 128GB", badge: null, image: "img/tải xuống (6).jpg" },
            { id: 23, category: "dienthoai", name: "Huawei P60 Pro 512GB", brand: "huawei", storage: "512GB", ram: "12GB", price: 26990000, oldPrice: null, rating: 4, specs: "6.67\" | Snapdragon 8+ Gen 1 | 512GB", badge: "new", image: "img/huawei-p60-pro-12gb-512gb-black-Goc3 - Copy.jpg" },
            { id: 24, category: "dienthoai", name: "Xiaomi Poco X5 Pro 256GB", brand: "xiaomi", storage: "256GB", ram: "8GB", price: 8490000, oldPrice: 9490000, rating: 4, specs: "6.67\" | Snapdragon 778G | 256GB", badge: "sale", image: "img/Xiaomi-Poco-X5-Pro-256GB-Goc2.jpg" },
            { id: 25, category: "dienthoai", name: "OnePlus 11 5G 256GB", brand: "oneplus", storage: "256GB", ram: "16GB", price: 18990000, oldPrice: null, rating: 5, specs: "6.7\" | Snapdragon 8 Gen 2 | 256GB", badge: "hot", image: "img/OnePlus-11-5G-256GB-Goc2.jpg" },
            { id: 26, category: "dienthoai", name: "Asus ROG Phone 7 512GB", brand: "asus", storage: "512GB", ram: "16GB", price: 27990000, oldPrice: null, rating: 5, specs: "6.78\" | Snapdragon 8 Gen 2 | 512GB", badge: "new", image: "img/Asus-ROG-Phone-7-512GB-Goc2.jpg" },
            { id: 27, category: "dienthoai", name: "Samsung Galaxy A05s 128GB", brand: "samsung", storage: "128GB", ram: "6GB", price: 3990000, oldPrice: null, rating: 3, specs: "6.7\" | Snapdragon 680 | 128GB", badge: null, image: "img/tải xuống (5).jpg" },
            { id: 28, category: "dienthoai", name: "Oppo Find X6 Pro 512GB", brand: "oppo", storage: "512GB", ram: "16GB", price: 29990000, oldPrice: null, rating: 5, specs: "6.82\" | Dimensity 9200 | 512GB", badge: "new", image: "img/tải xuống (7).jpg" },
            { id: 29, category: "dienthoai", name: "Realme GT Neo 5 256GB", brand: "realme", storage: "256GB", ram: "12GB", price: 12990000, oldPrice: 14990000, rating: 4, specs: "6.74\" | Snapdragon 8+ Gen 1 | 256GB", badge: "sale", image: "img/Realme-GT-Neo-5-256GB-Goc2.jpg" },
            { id: 30, category: "dienthoai", name: "Xiaomi Redmi 12C 64GB", brand: "xiaomi", storage: "64GB", ram: "4GB", price: 2990000, oldPrice: 3590000, rating: 3, specs: "6.71\" | Helio G85 | 64GB", badge: null, image: "img/f5677_1__2_2_1.jpg" },
            { id: 31, category: "dienthoai", name: "Samsung Galaxy M34 5G 128GB", brand: "samsung", storage: "128GB", ram: "8GB", price: 6990000, oldPrice: 7990000, rating: 4, specs: "6.5\" | Exynos 1280 | 128GB", badge: "sale", image: "img/Samsung-Galaxy-M34-5G-128GB-Goc1 - Copy.jpg" },
            { id: 32, category: "dienthoai", name: "Xiaomi Redmi Note 13 64GB", brand: "xiaomi", storage: "64GB", ram: "4GB", price: 3990000, oldPrice: 4590000, rating: 3, specs: "6.67\" | Dimensity 6080 | 64GB", badge: null, image: "img/tải xuống (4).jpg" },
            { id: 33, category: "dienthoai", name: "Oppo A58 4G 128GB", brand: "oppo", storage: "128GB", ram: "6GB", price: 5990000, oldPrice: 6590000, rating: 3, specs: "6.72\" | Helio G85 | 128GB", badge: "hot", image: "img/Oppo-A58-4G-128GB-Goc1.jpg" },
            { id: 34, category: "dienthoai", name: "Vivo Y27s 128GB", brand: "vivo", storage: "128GB", ram: "8GB", price: 5490000, oldPrice: 5990000, rating: 4, specs: "6.64\" | Snapdragon 680 | 128GB", badge: null, image: "img/Vivo-Y27s-128GB-Goc1.jpg" },
            { id: 35, category: "dienthoai", name: "Realme 11 5G 256GB", brand: "realme", storage: "256GB", ram: "8GB", price: 7990000, oldPrice: 8990000, rating: 4, specs: "6.72\" | Dimensity 6100+ | 256GB", badge: "sale", image: "img/Realme-11-5G-256GB-Goc1.jpg" },
            { id: 36, category: "dienthoai", name: "Nokia G42 5G 128GB", brand: "nokia", storage: "128GB", ram: "6GB", price: 4990000, oldPrice: null, rating: 3, specs: "6.56\" | Snapdragon 480+ | 128GB", badge: null, image: "img/Nokia-G42-5G-128GB-Goc1.jpg" },
            { id: 37, category: "dienthoai", name: "Tecno Spark 10 Pro 128GB", brand: "tecno", storage: "128GB", ram: "8GB", price: 3490000, oldPrice: null, rating: 3, specs: "6.8\" | Helio G88 | 128GB", badge: "new", image: "img/Tecno-Spark-10 Pro-128GB-Goc1.jpg" },
            { id: 38, category: "dienthoai",name: "Infinix Note 30 256GB", brand: "infinix", storage: "256GB", ram: "8GB", price: 5990000, oldPrice: 6990000, rating: 4, specs: "6.78\" | Helio G99 | 256GB", badge: "sale", image: "img/Infinix-Note-30-256GB-Goc1.jpg" },
            { id: 39, category: "dienthoai", name: "Samsung Galaxy A24 128GB", brand: "samsung", storage: "128GB", ram: "6GB", price: 4590000, oldPrice: 5290000, rating: 3, specs: "6.5\" | Helio G99 | 128GB", badge: null, image: "img/Samsung-Galaxy-A24-128GB-Goc1.jpg" },
            { id: 40, category: "dienthoai", name: "Xiaomi Poco M5 128GB", brand: "xiaomi", storage: "128GB", ram: "6GB", price: 4190000, oldPrice: 4990000, rating: 3, specs: "6.58\" | Helio G99 | 128GB", badge: "sale", image: "img/Xiaomi-Poco-M5-128GB-Goc1.jpg" },
            { id: 41, category: "dienthoai", name: "Oppo Reno8 T 5G 128GB", brand: "oppo", storage: "128GB", ram: "8GB", price: 8990000, oldPrice: 9990000, rating: 4, specs: "6.7\" | Snapdragon 695 | 128GB", badge: "sale", image: "img/Oppo-Reno8-T-5G-128GB-Goc1.jpg" },
            { id: 42, category: "dienthoai",name: "Vivo T1x 64GB", brand: "vivo", storage: "64GB", ram: "4GB", price: 3290000, oldPrice: 3890000, rating: 3, specs: "6.58\" | Snapdragon 680 | 64GB", badge: null, image: "img/Vivo-T1x-64GB-Goc1.jpg" },
            { id: 43, category: "dienthoai",name: "Realme C67 128GB", brand: "realme", storage: "128GB", ram: "8GB", price: 5590000, oldPrice: null, rating: 4, specs: "6.72\" | Snapdragon 685 | 128GB", badge: "new", image: "img/Realme-C67-128GB-Goc1.jpg" },
            { id: 44, category: "dienthoai", name: "Vsmart Joy 4 64GB", brand: "vsmart", storage: "64GB", ram: "4GB", price: 2490000, oldPrice: 2990000, rating: 3, specs: "6.53\" | Snapdragon 665 | 64GB", badge: "sale", image: "img/vsmart-joy-4_1__3_1_2.jpg" },
            { id: 45, category: "dienthoai", name: "Samsung Galaxy A05 64GB", brand: "samsung", storage: "64GB", ram: "4GB", price: 2990000, oldPrice: 3290000, rating: 2, specs: "6.7\" | Helio G85 | 64GB", badge: null, image: "img/A05-7.jpg" },
            { id: 46, category: "dienthoai", name: "Xiaomi Redmi 13C 128GB", brand: "xiaomi", storage: "128GB", ram: "6GB", price: 3790000, oldPrice: 4190000, rating: 3, specs: "6.74\" | Helio G85 | 128GB", badge: "hot", image: "img/Xiaomi-Redmi-13C-128GB.jpg" },
            { id: 47, category: "dienthoai",name: "Oppo Reno6 Z 5G 128GB", brand: "oppo", storage: "128GB", ram: "8GB", price: 7490000, oldPrice: 8490000, rating: 4, specs: "6.43\" | Dimensity 800U | 128GB", badge: "sale", image: "img/Oppo-Reno6-Z-5G-128GB.jpg" },
            { id: 48, category: "dienthoai",name: "Vivo Y02T 64GB", brand: "vivo", storage: "64GB", ram: "4GB", price: 2690000, oldPrice: null, rating: 2, specs: "6.51\" | Helio P35 | 64GB", badge: null, image: "img/Vivo-Y02T-64GB.jpg" },
            { id: 49, category: "dienthoai",name: "Motorola Moto G54 5G 128GB", brand: "motorola", storage: "128GB", ram: "8GB", price: 5990000, oldPrice: 6990000, rating: 4, specs: "6.5\" | Dimensity 7020 | 128GB", badge: "sale", image: "img/motorola-moto-g54-ro-ri.jpg" },
            { id: 50, category: "dienthoai", name: "Realme Narzo N53 64GB", brand: "realme", storage: "64GB", ram: "4GB", price: 3090000, oldPrice: null, rating: 3, specs: "6.74\" | Unisoc T612 | 64GB", badge: "new", image: "img/Realme-Narzo-N53-64GB.jpg" },
            { id: 51,category: "laptop", name: "MacBook Air M2 256GB", brand: "apple", storage: "256GB", ram: "8GB", price: 29990000, image: "img/MacBook-Air-M2-256GB.jpg",
                description: `
                  `,
             },
            { id: 52, category: "laptop", name: "Dell XPS 13", brand: "dell", storage: "512GB", ram: "16GB", price: 35990000, image: "img/Dell-XPS-13.jpg",
                description: `
                  `,
                 },
            { id: 53,category: "laptop", name: "Asus ROG Zephyrus G14",  brand: "asus", storage: "1TB", ram: "32GB", price: 49990000, image: "img/ASUS-ROG-Zephyrus-G14-Ryzen-7-5800HS-RTX-3050-01.jpg",
                description: `
                  `,
             },
            { id: 54, category: "laptop", name: "MacBook Pro M3 512GB", brand: "apple", storage: "512GB", ram: "16GB", price: 45990000, image: "img/MacBook-Pro-M3-512GB.jpg" },
            { id: 55, category: "laptop", name: "MacBook Air M1 256GB", brand: "apple", storage: "256GB", ram: "8GB", price: 21990000, image: "img/MacBook-Air-M1-256GB.jpg" },
            { id: 56, category: "laptop", name: "Dell Inspiron 15 3520", brand: "dell", storage: "512GB", ram: "16GB", price: 17990000, image: "img/Dell-Inspiron-15-3520.jpg" },
            { id: 57, category: "laptop", name: "Dell XPS 15 9530", brand: "dell", storage: "1TB", ram: "32GB", price: 57990000, image: "img/Dell-XPS-15-9530.jpg" },
            { id: 58, category: "laptop", name: "Asus ZenBook 14 OLED", brand: "asus", storage: "512GB", ram: "16GB", price: 21990000, image: "img/Asus-ZenBook-14-OLED.jpg" },
            { id: 59, category: "laptop", name: "Asus TUF Gaming F15", brand: "asus", storage: "512GB", ram: "16GB", price: 19990000, image: "img/Asus-TUF-Gaming-F15.jpg" },
            { id: 60, category: "laptop", name: "HP Spectre x360 14", brand: "hp", storage: "1TB", ram: "16GB", price: 39990000, image: "img/HP-Spectre-x360-14.jpg" },
            { id: 61, category: "laptop", name: "HP Pavilion 15", brand: "hp", storage: "512GB", ram: "8GB", price: 16990000, image: "img/hp-pavilion-15-eg3091tu-i7-8c5l2pa-170225-103417-620-600x600.jpg" },
            { id: 62, category: "laptop", name: "Lenovo ThinkPad X1 Carbon Gen 11", brand: "lenovo", storage: "1TB", ram: "16GB", price: 49990000, image: "img/Lenovo-ThinkPad-X1-Carbon-Gen-11-16gb-1TB.jpg" },
            { id: 63, category: "laptop", name: "Lenovo IdeaPad 5 14", brand: "lenovo", storage: "512GB", ram: "8GB", price: 14990000, image: "img/Lenovo-IdeaPad-5-14-8Gb-512Gb.jpg" },
            { id: 64, category: "laptop", name: "MSI GF63 Thin 11SC", brand: "msi", storage: "512GB", ram: "8GB", price: 17990000, image: "img/MSI-GF63-Thin-11SC.jpg" },
            { id: 65, category: "laptop", name: "MSI Stealth 16 Studio", brand: "msi", storage: "1TB", ram: "32GB", price: 52990000, image: "img/MSI-Stealth-16-Studio.jpg" },
            { id: 66, category: "laptop", name: "Acer Nitro 5 Gaming", brand: "acer", storage: "512GB", ram: "16GB", price: 18990000, image: "img/20740-acer-gaming-nitro-5-an515-45-r0b6-1.jpg" },
            { id: 67, category: "laptop", name: "Acer Aspire 7 A715", brand: "acer", storage: "512GB", ram: "16GB", price: 15990000, image: "img/acer-aspire-7-a715-75g-52s5-i5-nhq85sv002-600x600.jpg" },
            { id: 68, category: "laptop", name: "Gigabyte G5 KF", brand: "gigabyte", storage: "512GB", ram: "16GB", price: 23990000, image: "img/Gigabyte-G5-KF.jpg" },
            { id: 69, category: "laptop", name: "Huawei MateBook D15 2024", brand: "huawei", storage: "512GB", ram: "16GB", price: 17990000, image: "img/Huawei-MateBook-D15-2024.jpg" },
            { id: 70, category: "laptop", name: "LG Gram 16 2024", brand: "lg", storage: "1TB", ram: "16GB", price: 42990000, image: "img/LG-Gram-16-2024.jpg" },
            { id: 71, category: "laptop", name: "Razer Blade 15", brand: "razer", storage: "1TB", ram: "32GB", price: 64990000, image: "img/Razer-Blade-15.jpg" },
            { id: 72, category: "laptop", name: "Surface Laptop 5 13.5", brand: "microsoft", storage: "512GB", ram: "16GB", price: 35990000, image: "img/microsoft-surface-laptop-5-intel-core-i7-1265u-11686396754.jpg" },
            { id: 73, category: "maytinhbang", name: "iPad Pro 12.9″ (6th Gen)", brand: "apple", storage: "256GB", ram: "8GB", price: 30600000, image: "img/iPad-Pro-12.9.jpg" },
            { id: 74, category: "maytinhbang", name: "iPad Air 11″ (5th Gen)", brand: "apple", storage: "128GB", ram: "8GB", price: 14500000, image: "img/ipad-air-11-inch-m2-lte-blue-1-750x500.jpg" },
            { id: 75, category: "maytinhbang", name: "Samsung Galaxy Tab S10+ 14.6″", brand: "samsung", storage: "256GB", ram: "12GB", price: 16520000, image: "img/1715087752_1826704_07d03662ea8d4e28a1774e967b842267_master.jpg" },
            { id: 76, category: "maytinhbang", name: "Samsung Galaxy Tab A9+ 5G", brand: "samsung", storage: "128GB", ram: "8GB", price: 7360000, image: "img/Samsung-Galaxy-Tab-A9+-5G.jpg" },
            { id: 77, category: "maytinhbang", name: "Xiaomi Pad 8 Pro", brand: "xiaomi", storage: "256GB", ram: "8GB", price: 9190000, image: "img/Xiaomi-Pad-8-Pro.jpg" },
            { id: 78, category: "maytinhbang", name: "Redmi Pad 2", brand: "xiaomi", storage: "128GB", ram: "6GB", price: 4990000, image: "img/Redmi-Pad-2.jpg" },
            { id: 79, category: "maytinhbang", name: "Huawei MatePad Pro 11 ", brand: "huawei", storage: "128GB", ram: "8GB", price: 11550000, image: "img/Huawei-MatePad-Pro-11-(2022).jpg" },
            { id: 80, category: "maytinhbang", name: "Lenovo Tab K11 Gen 2", brand: "lenovo", storage: "64GB", ram: "4GB", price: 3538000, image: "img/Lenovo-Tab-K11-Gen-2.jpg" },
            { id: 81, category: "maytinhbang", name: "Samsung Galaxy Tab A11 WiFi 4GB/64GB", brand: "samsung", storage: "64GB", ram: "4GB", price: 3290000, image: "img/Samsung-Galaxy-Tab-A11-WiFi-4GB-64GB.jpg" },
            { id: 82, category: "maytinhbang", name: "iPad A16 WiFi 128GB", brand: "apple", storage: "128GB", ram: "4GB", price: 9990000, image: "img/320845392.jpg" },
            { id: 83, category: "phukien", name: "Tai nghe Bluetooth AirPods Pro 2", brand: "apple", price: 5490000, image: "img/Tai-nghe-Bluetooth-AirPods-Pro-2.jpg" },
            { id: 84, category: "phukien", name: "Sạc nhanh 20W USB-C Apple", brand: "apple", price: 690000, image: "img/Sạc-nhanh-20W-USB-C-Apple.jpg" },
            { id: 85, category: "phukien", name: "Cáp sạc Lightning to USB-C 1m", brand: "apple", price: 390000, image: "img/Cáp-sạc-Lightning-to-USB-C-1m.jpg" },
            { id: 86, category: "phukien", name: "Ốp lưng silicon iPhone 15 Pro Max", brand: "apple", price: 890000, image: "img/op-lung-iphone-15-pro-max-switcheasy-ultra-slim-sieu-mong-0.35mm1697525734.jpg" },
            { id: 87, category: "phukien", name: "Kính cường lực iPhone 15 Pro Max", brand: "gor", price: 250000, image: "img/mieng-dan-kinh-cuong-luc-iphone-15-pro-max-jcpal-1-750x500.jpg" },
            { id: 88, category: "phukien", name: "Chuột không dây Logitech M650", brand: "logitech", price: 690000, image: "img/Chuột-không-dây-Logitech-M650.jpg" },
            { id: 89, category: "phukien", name: "Bàn phím Bluetooth K380", brand: "logitech", price: 890000, image: "img/ban-phim-logitech-bluetooth-k380.jpg" },
            { id: 90, category: "phukien", name: "Thẻ nhớ SanDisk Ultra 128GB", brand: "sandisk", storage: "128GB", price: 490000, image: "img/Thẻ-nhớ-SanDisk-Ultra-128GB.jpg" },
            { id: 91, category: "phukien", name: "Sạc dự phòng Anker PowerCore 10000mAh", brand: "anker",  price: 890000, image: "img/Sạc-dự-phòng-Anker-PowerCore-10000mAh.jpg" },
            { id: 92, category: "phukien", name: "Giá đỡ điện thoại hợp kim xoay 360°", brand: "baseus", price: 290000, image: "img/gia-do-dien-thoai-xoay-360.jpg" },
            { id: 93, category: "phukien", name: "Giá đỡ laptop hợp kim nhôm", brand: "ugreen", price: 620000, image: "img/TAAUGR90396__11.jpg" },
            { id: 94, category: "phukien", name: "Balo laptop chống nước 15.6 inch", brand: "xiaomi", price: 790000, image: "img/balo-laptop-tomtoc-explorer-t60-16-inch-t60m1d1-tb-600x600.jpg" },
            { id: 95, category: "phukien", name: "Bàn di chuột RGB Razer Goliathus", brand: "razer",price: 690000, image: "img/77327_ban_di_chuot_razer_goliathus_xanh_den_25cm_x_30cm_day_4mm.jpg" },
            { id: 96, category: "phukien", name: "Tai nghe chụp tai Sony WH-CH520", brand: "sony", price: 1590000, image: "img/3379_tai_nghe_sony_wh_ch520_songlongmedia__7__f5dc2591487040a79bb6ce7cafeb5bf8_master.jpg" },
            { id: 97, category: "phukien", name: "Loa Bluetooth JBL Go 4", brand: "jbl", price: 1290000, image: "img/loa-bluetooth-jbl-go4.jpg" },
            { id: 98, category: "phukien", name: "Đế tản nhiệt laptop Cooler Master Notepal L1", brand: "coolermaster",price: 590000, image: "img/tải xuống (3).jpg" },
            { id: 99, category: "phukien", name: "Cáp sạc nhanh Type-C to Type-C 60W Baseus", brand: "baseus", price: 250000, image: "img/tải xuống.jpg" },
            { id: 100, category: "phukien", name: "Ổ cắm điện thông minh Xiaomi Mi Smart Plug", brand: "xiaomi", price: 390000, image: "img/O-Dien-Thong-Minh-Ket-Noi-Wifi-Xiaomi-Mi-Smart-Socket.jpg" },
            { id: 101, category: "phukien", name: "Thẻ nhớ Kingston Canvas Go! Plus 64GB", brand: "kingston", storage: "64GB", price: 290000, image: "img/tải xuống (1).jpg" },
            { id: 102, category: "phukien", name: "Bút cảm ứng Apple Pencil (Gen 2)", brand: "apple", price: 3390000, image: "img/tải xuống (2).jpg" },

]; 