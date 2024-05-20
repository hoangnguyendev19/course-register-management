# HỆ THỐNG ĐĂNG KÝ HỌC PHẦN

## Giới thiệu

Hệ thống cho phép sinh viên có thể đăng ký học phần, huỷ đăng ký học phần, xem lịch học, thông tin cá nhân còn giảng viên thì có thể xe lịch dạy học, thông tin cá nhân.

## Kiến trúc hệ thống

Hệ thống sử dụng Client-Server Architecture hoặc Two-tier Architecture

<img src="https://res.cloudinary.com/dthusmigo/image/upload/v1716129335/client-server-architecture.jpg" alt="architecture" width="800px" height="500px" />

### Ưu điểm

- Deployability: Kiến trúc tạo điều kiện triển khai dễ dàng các ứng dụng trên nhiều client vì client chỉ cần cài đặt phần mềm nhẹ. Kiến trúc này cho phép quản lý tập trung các bản cập nhật trên server, giảm bớt sự phức tạp khi triển khai.

- Elasticity: Kiến trúc có thể được thiết kế để mở rộng quy mô tài nguyên một cách linh hoạt dựa trên nhu cầu. Server có thể được cấu hình để xử lý các tải khác nhau bằng cách thêm hoặc xóa tài nguyên khi cần, đảm bảo hiệu suất và sử dụng tài nguyên tối ưu.

- Evolutionary: Nó cho phép dễ dàng tiến hóa và nâng cấp các thành phần hệ thống mà không làm gián đoạn toàn bộ hệ thống. Khi công nghệ phát triển, các bản cập nhật và cải tiến có thể được thực hiện một cách độc lập đối với các thành phần server và client, cho phép áp dụng dần dần các tính năng mới.

- Fault tolerance: Kiến trúc cung cấp các cơ chế chịu lỗi tích hợp. Dự phòng có thể được triển khai ở cấp máy chủ để đảm bảo tính sẵn sàng và tính toàn vẹn dữ liệu cao, giảm thiểu tác động của lỗi phần cứng hoặc gián đoạn mạng.

- Modularity: Kiến trúc thúc đẩy tính mô đun và phát triển dựa trên thành phần. Bằng cách tách biệt các thành phần client và server, nhà phát triển có thể tập trung vào việc xây dựng mã mô-đun và có thể tái sử dụng, nâng cao khả năng bảo trì và khả năng mở rộng.

- Overall cost: Kiến trúc có thể giảm chi phí tổng thể bằng cách tập trung tài nguyên và quản lý. Server tập trung cho phép sử dụng tài nguyên hiệu quả, bảo trì đơn giản và giảm yêu cầu phần cứng so với kiến trúc phân tán.

- Performance: Nó cho phép sử dụng hiệu quả các nguồn tài nguyên và hiệu suất được tối ưu hóa. Kiến trúc này cho phép các tài nguyên máy chủ chuyên dụng xử lý các tác vụ xử lý chuyên sâu, giúp cải thiện thời gian phản hồi và hiệu suất tổng thể của hệ thống.

- Reliability: Kiến trúc nâng cao độ tin cậy thông qua quản lý tập trung và dự phòng. Bằng cách tập trung các chức năng quan trọng trên máy chủ và thực hiện các biện pháp dự phòng, hệ thống có thể duy trì mức độ tin cậy cao ngay cả khi gặp lỗi.

- Scalability: Kiến trúc hỗ trợ khả năng mở rộng theo chiều ngang và chiều dọc. Server có thể được mở rộng quy mô (tỉ lệ theo chiều dọc) bằng cách nâng cấp phần cứng hoặc thu nhỏ quy mô (tỉ lệ theo chiều ngang) bằng cách thêm nhiều server hơn để phân phối khối lượng công việc, đảm bảo khả năng mở rộng nhằm đáp ứng nhu cầu ngày càng tăng.

- Simplicity: Nó mang lại sự đơn giản trong thiết kế và quản lý hệ thống. Việc phân tách rõ ràng trách nhiệm của client và server giúp đơn giản hóa kiến trúc, phát triển và bảo trì hệ thống, dẫn đến việc khắc phục sự cố và nâng cấp dễ dàng hơn.

- Testability: Kiến trúc tạo điều kiện cho việc kiểm tra và gỡ lỗi hiệu quả. Với các giao diện được xác định rõ ràng giữa client và server, việc tách biệt và kiểm tra các thành phần riêng lẻ trở nên dễ dàng hơn, đảm bảo kiểm soát chất lượng tốt hơn và chu kỳ phát triển nhanh hơn.

### Nhược điểm

- Deployability: Việc triển khai có thể trở nên phức tạp đối với các ứng dụng, đặc biệt nếu phát sinh vấn đề tương thích. Việc quản lý các phiên bản khác nhau của phần mềm trên nhiều nền tảng và thiết bị có thể gây ra những thách thức khi triển khai và các vấn đề về khả năng tương thích.

- Elasticity: Việc mở rộng quy mô tài nguyên server một cách linh hoạt có thể yêu cầu các cơ chế quản lý tài nguyên và cân bằng tải phức tạp. Để đạt được tính linh hoạt liền mạch trong kiến trúc client-server đòi hỏi phải lập kế hoạch và triển khai cẩn thận các chiến lược phân bổ tài nguyên động, điều này có thể làm tăng thêm độ phức tạp cho hệ thống.

- Evolutionary: Sự phát triển của kiến trúc có thể yêu cầu cập nhật cho cả thành phần client và server, dẫn đến những thách thức về đồng bộ hóa. Việc giới thiệu các tính năng hoặc công nghệ mới có thể cần phải cập nhật cho cả phần mềm client và server, có khả năng gây ra sự cố tương thích và yêu cầu các bản phát hành được đồng bộ hóa.

- Fault tolerance: Việc triển khai các cơ chế chịu lỗi sẽ làm tăng thêm độ phức tạp và chi phí chung cho hệ thống. Cơ chế dự phòng và chuyển đổi dự phòng yêu cầu nguồn lực bổ sung và chi phí quản lý, điều này có thể làm tăng độ phức tạp và chi phí của hệ thống.

- Modularity: Quá phụ thuộc vào giao tiếp giữa client và server có thể dẫn đến sự liên kết chặt chẽ giữa các thành phần. Việc ghép nối quá mức giữa các thành phần client và server có thể cản trở tính mô đun hóa và khiến hệ thống khó bảo trì và phát triển hơn.

- Overall cost: Chi phí thiết lập và bảo trì ban đầu cho server có thể rất lớn. Việc thiết lập và duy trì cơ sở hạ tầng server tập trung, bao gồm phần cứng, phần mềm và kết nối mạng, có thể phải chịu chi phí trả trước cao so với kiến trúc ngang hàng hoặc kiến trúc phân tán.

- Performance: Hiệu suất có thể bị ảnh hưởng bởi độ trễ mạng và giới hạn băng thông. Giao tiếp giữa client và server qua mạng gây ra các hạn chế về độ trễ và băng thông, điều này có thể ảnh hưởng đến khả năng phản hồi và thông lượng theo thời gian thực, đặc biệt là trong môi trường phân tán.

- Reliability: Sự phụ thuộc vào các server tập trung làm tăng nguy cơ xảy ra lỗi ở một điểm. Nếu server bị lỗi hoặc ngừng hoạt động, nó có thể làm gián đoạn quyền truy cập vào dịch vụ của tất cả khách hàng, có khả năng dẫn đến thời gian ngừng hoạt động và mất dữ liệu đáng kể.

- Scalability: Việc mở rộng quy mô tài nguyên server có thể đạt đến giới hạn do hạn chế về phần cứng hoặc tắc nghẽn kiến trúc. Mặc dù kiến trúc client-server hỗ trợ triển khai có thể mở rộng nhưng có thể có những hạn chế thực tế đối với việc mở rộng quy mô tài nguyên server, chẳng hạn như giới hạn phần cứng hoặc tắc nghẽn kiến trúc.

- Simplicity: Độ phức tạp có thể tăng lên khi hệ thống phát triển về quy mô và độ phức tạp. Việc quản lý một hệ thống client-server lớn và phức tạp với nhiều client, server và các thành phần được kết nối với nhau có thể ngày càng trở nên khó khăn hơn, dẫn đến độ phức tạp và chi phí bảo trì cao hơn.

- Testability: Việc kiểm thử các hệ thống phân tán có thể phức tạp hơn và yêu cầu môi trường kiểm thử chuyên biệt. Việc kiểm tra sự tương tác giữa các thành phần client và server, đặc biệt là trong môi trường phân tán, có thể khó khăn hơn so với việc kiểm tra các hệ thống độc lập, đòi hỏi các công cụ và môi trường kiểm tra chuyên dụng.

## Về công nghệ sử dụng

- Client-side(Front-end): ReactJS, Redux-Toolkit

- Server-side(Back-end): Spring boot, Spring Data JPA, MariaDB

## Yêu cầu cài đặt

```
Node v18.17.1 trở lên
Java JDK 17 trở lên
Maven 3.1.1 trở lên
MariaDB
```

## Hướng dẫn cài đặt

### Front-end

#### 1. Mở thư mục frontend

```
cd frontend
```

#### 2. Tải các dependencies

```
npm install
```

#### 3. Chạy chương trình

```
npm run dev
```

### Back-end

#### 1. Mở thư mục backend

```
cd backend
```

#### 2. Tải maven dependencies

```
mvn clean install
```
