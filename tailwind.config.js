/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Chỉ bao gồm các file trong thư mục src/ui
  ],
  corePlugins: {
    preflight: false, // Tắt CSS mặc định của Tailwind
  },
  darkMode: 'class', // Chế độ tối sẽ được kích hoạt khi có class "dark"
  theme: {
    extend: {
      colors: {
        primary: '#2348ff', // Thêm màu primary
        secondary: '#2ecc71', // Thêm màu secondary
        accent: '#e91e63', // Màu accent tùy chỉnh
      },
      spacing: {
        '128': '32rem', // Khoảng cách lớn 128 cho padding, margin
        '144': '36rem',
      },
      fontSize: {
        '2xs': '0.65rem', // Kích thước font cực nhỏ
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      borderRadius: {
        'xl': '1rem', // Tạo border radius lớn hơn
        '2xl': '1.5rem',
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)', // Thêm shadow tùy chỉnh
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin hỗ trợ form
    require('@tailwindcss/typography'), // Plugin hỗ trợ typography
  ],
}
