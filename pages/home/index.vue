<template>
	<view class="container">
		<view class="header">
			<view class="store-name">
				<text class="title-name">{{ restaurant.name }}</text>
			</view>

			<view>
				<text class="welcome">公主/王子请点餐</text>
			</view>
		</view>
		<view class="notice-bar">
			<uni-notice-bar backgroundColor="rgb(244, 240, 237)" color="rgb(53, 64, 78)" scrollable v-if="noticeBarText" :text="noticeBarText" :fontSize="12" :customHight="12" />
		</view>
		<view class="body" v-if="categorys.length">

			<!-- 左侧-类目列表 -->
			<view class="left">
				<scroll-view :scroll-top="categoryScrollTop" :scroll-into-view="menuScrollIntoView"
					scroll-with-animation scroll-y="true" class="category-scroll-Y" @scrolltoupper="categoryUpper"
					@scrolltolower="categoryLower" @scroll="categoryScroll">
					<view class="wrapper">
						<view class="category-scroll-view-item" :id="`menu-${category.id}`"
							:class="{'category-current': category.id === currentCateId}"
							v-for="(category, index) in categorys" :key="index" @tap="handleMenuTap(category.id)">
							<text class="category-name-1">{{ category.name }}</text>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 右侧-菜品列表 -->
			<view class="right">
				<scroll-view class="foods-scroll-Y" scroll-with-animation scroll-y :scroll-top="foodScrollTop"
					@scroll="handleFoodsScroll">

					<view class="swiper-body">
						<swiper class="banners" id="banners" autoplay :interval="2000" indicator-dots>
							<swiper-item v-for="(item, index) in banners" :key='index'>
								<image class="img" :src="item.image"></image>
							</swiper-item>
						</swiper>
					</view>

					<view class="foods-list">
						<view class="category" v-for="(category, index) in categorys" :key="index"
							:id="`cate-${category.id}`">
							<view class="category-name-2">
								<text>{{ category.name }}</text>
								<image v-if="category.icon" :src="category.icon" class="icon"></image>
							</view>

							<view class="foods">
								<view class="food-item" v-for="(food, key) in category.foods" :key="key">
									<image :src="food.image" class="prod-image">
									</image>
									<view class="right-items">
										<text class="prod-name">{{ food.name }}</text>
										<view class="price">
											<text>￥{{ food.price }}</text>
											<button v-if="food.sku.length > 1" type="primary" class="add-btn-2"
												size="min" hover-class="none" @click="popupSku(food)">
												<text>选择规格</text>
											</button>
											<view v-else>
												<view v-if="isInCartList(food)">
													<view class="add-reduce-box">
														<button type="default" plain size="mini" class="add-reduce-btn"
															@tap="handleReduce(food)">
															<view class="iconfont iconsami-select"></view>
														</button>
														<view class="number">{{ cartNumOfCurrentSku(food.sku[0]) }}
														</view>
														<button type="primary" class="add-reduce-btn" size="min"
															@tap="handleAdd(food)">
															<view class="iconfont iconadd-select"></view>
														</button>

													</view>
												</view>
												<view v-else class="add-box">
													<button type="primary" class="add-btn-1" size="min"
														hover-class="none" @tap="handleAdd(food)">
														<view class="iconfont iconadd-select"></view>
													</button>
												</view>
											</view>

										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</scroll-view>
			</view>

		</view>

		<!-- 弹窗显示sku选项 -->
		<view>
			<uni-popup ref="skuPopupRef" background-color="#fff" @change="openOrClosePopupSku">
				<view class="popup-content">
					<view class="food-name-box">
						<text class="text-tital">{{ foodName }}</text>
					</view>
					<!-- 渲染sku选项 -->
					<view class="attributes" v-for="(attributeName, groupIndex) in skuAttributeNames" :key="groupIndex">
						<text class="attribute-text">{{attributeName}}</text>
						<view class="attribute-value">
							<text class="attribute-value-item"
								:style="{'width': attributeValue.length <= 2 ? '92rpx' : attributeValue.length * 26 + 40 + 'rpx' }"
								v-for="(attributeValue, attributeIndex) in skuAttributesMap.get(attributeName)"
								:key="attributeIndex" :data-attribute-value="attributeValue"
								:class="{'attributeValue-current': attributeIndex === currentAttributeIndex[groupIndex] }"
								@tap="selectAttributeValue(groupIndex, attributeIndex, attributeValue)">{{attributeValue}}</text>
						</view>
					</view>

					<!-- 渲染弹框底部的商品价格和数量 -->
					<view class="food-information">
						<view class="price-attribute-value">
							<text class="text-price">￥{{currentSku.price}}</text>
							<text class="text-attribute-value">{{ currentSkuAttribute }}</text>
						</view>
						<view class="counter-box">
							<button type="default" plain size="mini" class="btn" @tap="handleReduceNum">
								<view class="iconfont iconsami-select"></view>
							</button>
							<view class="number">{{ currentSku.num }}</view>
							<button type="primary" class="btn" size="min" @tap="handleAddNum">
								<view class="iconfont iconadd-select"></view>
							</button>
						</view>
					</view>

					<view class="add-to-Cart-box">
						<text class="cart-text" @tap="addToCart">加入购物车</text>
					</view>
				</view>
			</uni-popup>
		</view>

		<!-- 底部浮动条-购物车+结算 -->
		<view class="add-to-cart" v-if="cartList.length > 0">
			<view class="img-box">
				<image src="/static/image/cart.png" class="cart-img" @tap="openCartPopup()"></image>
				<view class="tag">{{ totalCartNumber }}</view>
			</view>
			<view class="cart-price">￥{{ totalPrice }}</view>
			<button type="primary" class="pay-btn" @tap="toPreOrderPage">
				去结算
			</button>
		</view>

		<!-- 底部购物车列表 -->
		<view class="cart-bottom">
			<uni-popup ref="cartPopupRef" background-color="#fff">
				<scroll-view class="cart-list" scroll-y>
					<view class="cart-popup-content">
						<view class="clearCartBox">
							<text class="clearCart" @tap="openClearAllConfirm">清空</text>
						</view>
						<view class="cart-item">
							<view v-for="cart in cartList" :key="cart.skuid">
								<view class="cart-content">
									<view class="cart-food-box">
										<text class="cart-food-name">{{cart.name}}</text>
										<view class="cart-food-attributes">{{cart.dna}}</view>
									</view>
									<view class="price-box">
										<text class="cart-item-price">￥{{cart.price}}</text>
									</view>
									<view class="counter-box">
										<button type="default" plain size="mini" class="btn"
											@tap="handleReduceNumForCart(cart)">
											<view class="iconfont iconsami-select"></view>
										</button>
										<view class="number">{{cart.num}}</view>
										<button type="primary" class="btn" size="min" @tap="handleAddNumForCart(cart)">
											<view class="iconfont iconadd-select"></view>
										</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</uni-popup>
		</view>

		<!-- 是否清空购物车对话框 -->
		<view>
			<uni-popup ref="isClearDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" title="提示" value="确定要全部删除购物车吗!" @confirm="clearShoppingCart"
					class="clearReminder">确定要清空全部购物车吗?</uni-popup-dialog>
			</uni-popup>
		</view>

		<view>
			<!-- 弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="settlement">
					<!-- <text class="text">待开发功能</text> -->
					<img class="settlementimg" src="/static/image/zhifu.png" alt="" />
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				restaurant: undefined,
				tableNumber: undefined,
				numberOfDiners: undefined,
				categorys: [],
				banners: [],
				menuScrollIntoView: '',
				currentCateId: 6905, //默认分类
				cart: [], //购物车
				categoryScrollTop: 0, //类目滚动到哪个位置
				foodScrollTop: 0, //商品滚动到哪个位置
				good: {}, //当前菜品
				category: {}, //当前菜品所在分类
				goodDetailModalVisible: false, //是否菜品详情模态框
				noticeBarText: "瘦瘦的确实很好看 但我更希望你好好吃饭 坏心情与你无关", //滚动框
				calculatedTop: false,
				foodName: "",
				cartList: [],
				isOpenCartdialog: false,
				skuAttributesMap: new Map(),
				skuAttributesDNAMap: new Map(),
				skuAttributeNames: [],
				// skuAttributeValues: [],
				currentAttributeIndex: [],
				currentAttributeValue: [],
				currentSku: {}
			}
		},

		async onLoad() {
			await this.init()
		},
		computed: {
			totalCartNumber() {
				if (this.cartList.length === 0) {
					return 0;
				}
				return this.cartList.map(cart => cart.num).reduce((a, b) => a + b);
			},
			totalPrice() {
				if (this.cartList.length === 0) {
					return 0;
				}
				return this.cartList.map(cart => parseFloat(cart.num * cart.price)).reduce((a, b) => a + b)
			},
			currentSkuAttribute() {
				if (this.currentSku && this.currentSku.attribute) {
					let attributes = JSON.parse(this.currentSku.attribute)
					let dna = attributes.map(item => Object.values(item)[0]).join(', ');
					return dna;
				}
				return '';
			}
		},
		methods: {
			async init() { //页面初始化
				this.restaurant = uni.getStorageSync('restaurant')
				this.tableNumber = uni.getStorageSync('tableNumber')
				this.numberOfDiners = uni.getStorageSync('numberOfDiners')

				this.categorys = await this.$api('categorys')
				this.banners = await this.$api('banners')

				this.$nextTick(() => { 
					this.calcCategoryTop();
				})
			},
			popupSku(food) {
				//每次打开popupSku时,让当前sku赋值为默认值
				this.currentAttributeIndex = [];
				this.currentAttributeValue = [];

				//先获取所有属性名称
				let skuArrList = JSON.parse(food.sku[0].attribute)

				skuArrList.forEach(item => {
					let skuArrName = Object.keys(item)[0];
					this.skuAttributesMap.set(skuArrName, []);
					this.currentAttributeIndex.push(0); //默认选中第一个选项
				})

				console.log(this.skuAttributesMap); //{"份量" => Array(0), "口味" => Array(0)}

				//循环每一个sku
				food.sku.forEach(sku => {
					//[{\"份量\":\"小\"},{\"口味\":\"辣\"}]
					let attributes = JSON.parse(sku.attribute)

					//的每一个属性对象, 放进对应map的Set集合里
					attributes.forEach(item => { //{\"份量\":\"小\"}
						let skuArrName = Object.keys(item)[0];
						let attributeValue = Object.values(item)[0];
						let skuAttributes = this.skuAttributesMap.get(skuArrName);
						if (skuAttributes.indexOf(attributeValue) === -1) {
							skuAttributes.push(attributeValue);
						}
					})

					//方便用户选择规格后, 通过dna, 找回对应的sku
					let dna = attributes.map(item => Object.values(item)[0]).join(', ');
					this.skuAttributesDNAMap.set(dna, sku)
					console.log(dna);
				})

				console.log(this.skuAttributesDNAMap);

				//默认是第一个sku
				let [firstSku] = this.skuAttributesDNAMap.values();
				this.currentSku = firstSku;
				this.$set(this.currentSku, 'num', 1)
				console.log(this.currentSku);

				//选中第一个sku
				let [firstDNA] = this.skuAttributesDNAMap.keys();
				this.currentAttributeValue = firstDNA.split(", ");

				//v-for 无法循环 this.skuAttributesMap
				this.skuAttributeNames = [...this.skuAttributesMap.keys()];
				// this.skuAttributeValues = [...this.skuAttributesMap.values()];

				this.$nextTick(() => {
					this.foodName = food.name;
					// this.$refs.skuPopupRef.close();
				})

				this.$refs.skuPopupRef.open();

			},
			openCartPopup() {
				this.isOpenCartdialog = !this.isOpenCartdialog
				if (this.isOpenCartdialog) {
					this.$refs.cartPopupRef.open('bottom');
				} else {
					this.$refs.cartPopupRef.close()
				}
			},

			openOrClosePopupSku(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			categoryUpper(e) {
				console.log(e)
			},
			categoryLower(e) {
				console.log(e)
			},
			categoryScroll(e) {
				console.log(e)
				// this.old.categoryScrollTop = e.detail.scrollTop
			},

			handleFoodsScroll(e) {
				let scrollTop = e.detail.scrollTop;
				// console.log(scrollTop)
				let currentCategory = this.categorys.find(category => scrollTop >= category.top && scrollTop < category
					.bottom)
				// console.log(currentCategory)
				if (currentCategory) {
					this.currentCateId = currentCategory.id;
				}
			},

			handleMenuTap(categoryId) { //点击菜单项事件
				this.currentCateId = categoryId
				if (!this.calculatedTop) { //防止多次点击菜单
					this.calcCategoryTop()
				}

				this.$nextTick(() => { 
					setTimeout(() => { 

						let currentCategory = this.categorys.find(item => item.id === categoryId);
						this.foodScrollTop = currentCategory.top + 2; 
						console.log(currentCategory.top)

					}, 50)
				})
			},

			calcCategoryTop() {
				this.calculatedTop = false;

				let h = 10 //初始化顶部距离高度

				let view = uni.createSelectorQuery().select('#banners') 
				console.log(view);
				view.fields({
					size: true
				}, data => {
					h += Math.floor(data.height) 
				}).exec()

				//计算每个类目的在滚动列表中的位置 top 值
				this.categorys.forEach(category => {
					let prodView = uni.createSelectorQuery().select(`#cate-${category.id}`)
					prodView.fields({
						size: true
					}, data => {
						// category.top = h
						this.$set(category, "top", h);
						h += data.height 
						this.$set(category, "bottom", h);
						// category.bottom = h
					}).exec()
				})

				this.calculatedTop = true;
			},

			menuCartNum() {

			},

			toPreOrderPage() {
				this.$refs.popup.open("center")
			},

			handleReduce(food) {
				let sku = food.sku[0];
				let findSku = this.cartList.find(item => item.skuid === sku.id)
				if (findSku) {
					findSku.num--
				}

				//过滤掉num <= 0 的cart
				this.cartList = this.cartList.filter(item => item.num > 0);
			},

			handleAdd(food) {
				let sku = food.sku[0];
				let findSku = this.cartList.find(item => item.skuid === sku.id)
				// console.log(findSku);
				if (findSku) {
					findSku.num++
				} else {
					// let attributes = JSON.parse('[{\"份量\":\"小\"},{\"口味\":\"辣\"}]');
					// console.log(attributes)
					let attributes = JSON.parse(sku.attribute);
					let attribute = attributes.map(item => Object.values(item)[0]).join(', ');

					let cart = {
						name: food.name,
						skuid: sku.id,
						price: sku.price,
						num: 1,
						dna: attribute
					}
					this.cartList.push(cart);
				}

			},

			handleReduceNumForCart(cart) {
				cart.num--
				//过滤掉num <= 0 的cart
				this.cartList = this.cartList.filter(item => item.num > 0);
				//重新计算价格 改用了compute 自动计算价格
				// this.calculateTotalPrice()
				//是否关闭popup
				if (!this.cartList.length) {
					this.$refs.cartPopupRef.close()
				}
			},

			handleAddNumForCart(cart) {
				cart.num++
			},

			openClearAllConfirm() {
				this.$refs.isClearDialog.open()
			},


			clearShoppingCart() {
				this.cartList = []
				this.$refs.isClearDialog.close()
				this.$refs.cartPopupRef.close()
			},

			isInCartList(food) {
				return this.cartList.some(cart => cart.skuid === food.sku[0].id)
			},

			cartNumOfCurrentSku(sku) {
				let findSku = this.cartList.find(cart => cart.skuid === sku.id)
				return findSku.num;
			},

			selectAttributeValue(groupIndex, attributeIndex, attributeValue) {
				// this.currentAttributeIndex[groupIndex] = attributeIndex;
				this.$set(this.currentAttributeIndex, groupIndex, attributeIndex)

				this.$set(this.currentAttributeValue, groupIndex, attributeValue)
				let dna = this.currentAttributeValue.join(", ");

				//切换 this.currentSku
				this.currentSku = this.skuAttributesDNAMap.get(dna);
				//默认数量设置为 1
				this.$set(this.currentSku, 'num', 1)

			},
			handleAddNum() {
				if (this.currentSku.num >= 20) {
					return
				} else {
					this.currentSku.num++
				}
			},
			handleReduceNum() {
				if (this.currentSku.num == 1) {
					return
				} else {
					this.currentSku.num--
				}
			},

			addToCart() {
				let findSku = this.cartList.find(item => item.skuid === this.currentSku.id)
				if (findSku) {
					findSku.num += this.currentSku.num
				} else {
					let attributes = JSON.parse(this.currentSku.attribute);
					let attribute = attributes.map(item => Object.values(item)[0]).join(', ');

					let cart = {
						name: this.foodName,
						skuid: this.currentSku.id,
						price: this.currentSku.price,
						num: this.currentSku.num,
						dna: attribute
					}
					this.cartList.push(cart);
				}

				this.$refs.skuPopupRef.close()

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/pages/home/index.scss';
</style>