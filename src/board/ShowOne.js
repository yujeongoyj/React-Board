import {useParams} from "react-router-dom";
import axios from 'axios'
import {useEffect} from "react";

let ShowOne = () => {
    // axios
    // jquery 에서는 ajax를 썼다면
    // node.js 에서는 axios

    let params = useParams()
    let id = parseInt(params.id)

    // 이 함수는 함수인데 비동기 함수이다 라는 뜻 (= async)
    useEffect(() => {
        let test = async() => {
            // await 키워드는 axios 의 행동이 끝날때까지 기다리라는 의미
            // 반드시 비동기화 함수(async) 안에서 사용
            let resp = await axios.get('http://localhost:8080/', {})
            console.log(resp)
        }
        test()
    }, [])



    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}

export default ShowOne