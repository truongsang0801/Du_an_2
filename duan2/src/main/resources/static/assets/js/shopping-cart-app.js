const app =  angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function($scope, $http){
    /*
    * QUẢN LÝ GIỎ HÀNG
    */
   $scope.cart = {
       items: [],
       //thêm sp vào giỏ hàng
       add(id){
          var item = this.items.find(item => item.id == id);
          if(item){//nếu có item thì 
			item.qty++;//tăng số lượng lên
			this.saveToLocalStorage();
		}
		else{
			$http.get(`/rest/products/${id}`).then(resp => {//chưa có thì tải sp trên server
				resp.data.qty = 1;//đặt số lượng là 1
				this.items.push(resp.data);//bỏ vào danh sách các mặt hàng
				this.saveToLocalStorage();
			})
		}
       },
       //xóa sp khỏi giỏ hàng
       remove(id){
			var index = this.items.findIndex(item => item.id == id);
			this.items.splice(index, 1);//splice để xóa
			this.saveToLocalStorage();
		},
       //xóa sạch các mặt hàng trong giỏ
       clear(){
			this.items = [];
			this.saveToLocalStorage();
		},
       //tính thành tiền của 1 sp
       amt_of(item){
	
		},
       //tính tổng số lượng mặt hàng trong giỏ
       get count(){
			return this.items
				.map(item => item.qty)//duyệt qua các mặt hàng lấy ra quantity số lượng
				.reduce((total, qty) => total += qty,0);//reduce để tính tổng
		},
         //tổng thành tiền các mắt hàng trong giỏ
       get amount(){
			return this.items
				.map(item => item.qty*item.price)//tổng số lượng nhân đơn giá để thành tiền
				.reduce((total, qty) => total += qty,0);
		},
       //lưu giỏ hàng vào local storage
       saveToLocalStorage(){
			var json = JSON.stringify(angular.copy(this.items));//coppy dữ liệu vào json
			localStorage.setItem("cart", json);//sau đó lưu dữ liệu vào localstorage với tên là cart
		},
       //đọc giỏ hàng từ local storage đã được lưu
       loadFromLocalStorage(){
			var json = localStorage.getItem("cart");//đọc lại cart trong localStorage
			this.items = json ? JSON.parse(json) : [];//nếu có thì chuyển sang json và gán vào item ngược lại thì gán cho mảng rỗng
		}      
   	}
   	$scope.cart.loadFromLocalStorage();

/*
*QUẢN LÝ ĐẶT HÀNG
*/
	$scope.order = {
		createDate: new Date(),
		address: "",
		account: {username: $("#username").text()},
		get orderDetails(){
			return $scope.cart.items.map(item => {
				return{
					product:{id: item.id},
					price: item.price,
					quantity: item.qty
				}
			});
		},
		purchase(){
			var order = angular.copy(this);
			//thực hiện đặt hàng
			$http.post("/rest/orders", order).then(resp => {
				alert("Đặt hàng thành công!");
				$scope.cart.clear();
				location.href = "/order/detail/" + resp.data.id;
			}).catch(error => {
				alert("Đặt hàng lỗi!")
				console.log(error)
			})
		}
	}
})