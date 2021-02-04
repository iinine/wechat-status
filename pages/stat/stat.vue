<template>
	<view class="index">
	    <view class="photo_detail">
	      <view class="title">{{ stat.title }}</view>
	      <view class="content">
	        <rich-text :nodes="stat.content"></rich-text>
	      </view>
	      <view class="source">
	        <image
	          mode="widthFix"
	          @tap="preview(stat.link)"
	          :src="stat.link"
	          v-if="stat.type == 1"
	        />
	        <video
	          :src="stat.link"
	          v-if="stat.type == 2"
	          controls="true"
	          :poster="stat.thumb"
	        />
	      </view>
		  		  
		  <button plain class="download" @click="downloadImage()" v-if="stat.type == 1">
		  	保存图片
		  </button>
		  <button plain class="download" @click="downloadVideo()" v-if="stat.type == 2">
		  	保存视频
		  </button>

	    </view>
	  </view>
	
	
</template>

<script>

	export default {
		data() {
			return {
				id: '',
				stat: {}
			};
		},
		onLoad(e) {
			this.stat = JSON.parse(e.dataItem)
			console.log(this.stat);
		},
		onShow(e) {
		},
		onShareAppMessage(res) {
			var message = {
				title: '快来康康最新最潮的微信状态',
				path: '/pages/status/status',
				imageUrl: stat.thumb
			};
			return message
		},
		onShareTimeline() {
			var message = {
				title: '快来康康最新最潮的微信状态',
				path: '/pages/status/status',
				imageUrl: stat.thumb,
				imagePreviewUrl: stat.thumb
			};
			return message
		},
		methods: {
			handle() {
				return
			},
			downloadImage(){
				uni.showLoading({
					title: "获取图片中"
				})
				uni.downloadFile({
					url: this.stat.link,
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									uni.hideLoading();
									uni.showToast({
										title:"图片已保存"
									});
								},
								fail: () => {
									uni.hideLoading();
									uni.showToast({
										title:"图片保存失败"
									});
								}
							});
						}
					}
				});	
			},
			downloadVideo(){
				uni.showLoading({
					title: "获取视频中"
				})
				uni.downloadFile({
					url: this.stat.link,
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									uni.hideLoading();
									uni.showToast({
										title:"视频已保存"
									});
								},
								fail: () => {
									uni.hideLoading();
									uni.showToast({
										title:"视频保存失败"
									});
								}
							});
						}
					}
				});	
				
				
			},
			
		}
	};
</script>

<style lang="scss">
	.photo_detail {
	    padding: 25px;
	    .title {
	        font-size: 36px;
	        font-weight: 500;
	        color: #000;
	        margin-bottom: 20px;
	    }
	    .content {
	        margin-bottom: 20px;
	        color: #666;
	    }
	    .source {
	        margin-bottom: 20px;
	        image {
	            width: 100%;
	            display: block;
	            border-radius: 10px;
	        }
	        video {
	            width: 100%;
	        }
	    }
	    .download {
	        display: flex;
	        justify-content: center;
	        align-items: center;
	        width: 100%;
	        height: 100px;
	        border-radius: 10px;
	        margin-bottom: 20px;
	        font-size: 40px;
	        color: #fff;
	        font-weight: 600;
	        background-image: linear-gradient(135deg, #81FBB8 10%, #28C76F 100%);
	    }
	
	    .ad_item {
	      width: 700px;
	      overflow: hidden;
	      border-radius: 10px;
	      margin-bottom: 25px;
	    }
	}
</style>
