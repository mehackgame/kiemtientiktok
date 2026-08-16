function xuLyTaiFile(element, linkShopee, linkTaiLieu) {
    // Kiểm tra xem nút đang đếm ngược hoặc đã xong chưa, để tránh bấm nhiều lần
    var trangThai = element.getAttribute('data-status');
    if (trangThai === 'dang-cho' || trangThai === 'da-xong') {
        return;
    }

    // 1. Mở link Shopee ăn hoa hồng ở tab mới
    window.open(linkShopee, '_blank');

    // 2. Chuyển nút sang trạng thái đếm ngược
    element.setAttribute('data-status', 'dang-cho');
    element.classList.add('btn-waiting'); 
    
    var chuGoc = element.innerText; // Nhớ lại tên nút ban đầu
    var thoiGian = 5; // Chỉnh thời gian đếm ngược ở đây (5 giây)
    element.innerText = "Vui lòng đợi " + thoiGian + "s...";

    // 3. Bắt đầu đếm lùi
    var demLui = setInterval(function() {
        thoiGian--;
        element.innerText = "Vui lòng đợi " + thoiGian + "s...";

        if (thoiGian <= 0) {
            clearInterval(demLui); // Dừng đếm
            
            // 4. Biến nút thành nút tải file thực sự
            element.setAttribute('data-status', 'da-xong');
            element.classList.remove('btn-waiting');
            element.classList.add('btn-ready'); // Đổi sang màu xanh nổi bật
            element.innerText = "[Tải Ngay] " + chuGoc;
            
            // Thay đổi hành động click: Lần sau bấm vào sẽ ra thẳng file
            element.onclick = null; 
            element.href = linkTaiLieu;
            element.target = "_blank";
        }
    }, 1000); // 1000ms = 1 giây
}
