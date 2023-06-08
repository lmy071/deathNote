import axios, { AxiosRequestConfig } from 'axios'
// import qs from 'qs'

// 存储缓存数据
const cacheMap = new Map()

// 存储缓存当前状态
const statusMap = new Map<string, 'pending' | 'complete'>()

// 定义一下回调的格式
interface RequestCallback {
    onSuccess: (data: any) => void
    onError: (error: any) => void
}

// 存放等待状态的请求回调
const callbackMap = new Map<string, RequestCallback[]>()

interface MyRequestConfig extends AxiosRequestConfig {
    needCache?: boolean
}

// 这里用params是因为params是 GET 方式穿的参数，我们的缓存一般都是 GET 接口用的
function generateCacheKey(config: MyRequestConfig) {
    return config.url + '?' + JSON.stringify(config.params)
}

export function sendRequest(request: MyRequestConfig) {
    const cacheKey = generateCacheKey(request)

    // 判断是否需要缓存
    if (request.needCache) {
        if (statusMap.has(cacheKey)) {
            const currentStatus = statusMap.get(cacheKey)

            // 判断当前的接口缓存状态，如果是 complete ，则代表缓存完成
            if (currentStatus === 'complete') {
                return Promise.resolve(cacheMap.get(cacheKey))
            }

            // 如果是 pending ，则代表正在请求中，这里放入回调函数
            if (currentStatus === 'pending') {
                return new Promise((resolve, reject) => {
                    if (callbackMap.has(cacheKey)) {
                        callbackMap.get(cacheKey)!.push({
                            onSuccess: resolve,
                            onError: reject
                        })
                    } else {
                        callbackMap.set(cacheKey, [
                            {
                                onSuccess: resolve,
                                onError: reject
                            }
                        ])
                    }
                })
            }
        }

        statusMap.set(cacheKey, 'pending')
    }

    return axios(request).then(
        (res) => {
            // 这里简单判断一下，200就算成功了，不管里面的data的code啥的了
            if (res.status === 200) {
                statusMap.set(cacheKey, 'complete')
                cacheMap.set(cacheKey, res)
            } else {
                // 不成功的情况下删掉 statusMap 中的状态，能让下次请求重新请求
                statusMap.delete(cacheKey)
            }
            // 这里触发resolve的回调函数
            if (callbackMap.has(cacheKey)) {
                callbackMap.get(cacheKey)!.forEach((callback) => {
                    callback.onSuccess(res)
                })
                // 调用完成之后清掉，用不到了
                callbackMap.delete(cacheKey)
            }
            return res
        },
        (error) => {
            // 不成功的情况下删掉 statusMap 中的状态，能让下次请求重新请求
            statusMap.delete(cacheKey)
            // 这里触发reject的回调函数
            if (callbackMap.has(cacheKey)) {
                callbackMap.get(cacheKey)!.forEach((callback) => {
                    callback.onError(error)
                })
                // 调用完成之后也清掉
                callbackMap.delete(cacheKey)
            }
            return Promise.reject(error)
        }
    )
}

const getArticleList = (params: any) =>
    sendRequest({
        needCache: true,
        baseURL: 'http://localhost:8088',
        url: '/article/blogList',
        method: 'get',
        params
    })

export function testApi() {
    getArticleList({
        page: 1,
        pageSize: 10
    }).then(
        (res) => {
            console.log(res)
        },
        (error) => {
            console.error('error1:', error)
        }
    )
    getArticleList({
        page: 1,
        pageSize: 10
    }).then(
        (res) => {
            console.log(res)
        },
        (error) => {
            console.error('error2:', error)
        }
    )
}