<template>
	<view class="wrapper">
		 <view class="list">
			<view class="list-item" v-for="(status, i) in statusList" @click="goDetail(status)" :key="i">
				<image :src="status.thumb" mode="" class="list-item-img"></image>
			</view>
		 </view>
		 <uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		status
	} from '../../request';
	export default {
		components: {uniLoadMore},
		data() {
			return {
				statusList: [],
				page: 1,
				pagesize:5,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
			}
		},
		onLoad() {
			this.getstatusList()
		},
		onReachBottom(){  //上拉触底函数
			  if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
					this.isLoadMore=true
					this.page+=1
					this.getstatusList()
					this.isLoadMore=false
			  }
		},
		onShareAppMessage(res) {
			var message = {
				title: '快来康康最新最潮的微信状态',
				path: '/pages/status/status',
			};
			return message
		},
		onShareTimeline() {
			var message = {
				title: '快来康康最新最潮的微信状态',
				path: '/pages/status/status',
			};
			return message
		},
		methods: {
			goDetail(status) {
				uni.navigateTo({
					url: `/pages/stat/stat?id=${status.id}&&dataItem=`+ JSON.stringify(status)
				});
			},
			async loadMore(){
			 this.getstatusList();
			},
			async getstatusList() {
				console.log('getting status list');
				uni.showLoading({
					title: "获取状态中"
				})
				const res = await status(this.page)
				console.log('status data',res);
				if(this.page == 1){
					this.statusList = res.result.data
				}
				else{
					this.statusList = [...this.statusList, ...res.result.data];
				}
				this.page++;
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	.wrapper {
		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 25rpx 15rpx;
			justify-content: center;

			&-item {
				// width: 240 rpx;
				box-sizing: border-box;
				box-shadow: 0px 15px 10px -15px #000;
				margin-bottom: 20rpx;

				&-img {
					display: block;
					margin: auto;
					// width: 220rpx;
					// height: 360rpx;
					border-radius: 8px 8px 0 0;
				}
			}
		}
	}
</style>

