import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from 'axios'
import {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

let ShowOne = () => {
    // axios
    // jquery 에서는 ajax를 썼다면
    // node.js 에서는 axios

    let [data, setData] = useState({})
    let params = useParams()
    let id = parseInt(params.id)

    let location = useLocation();
    let userInfo = location.state.userInfo
    console.log(userInfo)

    let navigate = useNavigate()

    let goBack = () => {
        navigate(-1)
    }

    let onUpdate = () => {
        navigate('/board/update/' + id, {state: {userInfo: userInfo}})
    }
    // 이 함수는 함수인데 비동기 함수이다 라는 뜻 (= async)
    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/board/showOne/' + id, {
                    withCredentials: true
                })

                if (resp.status === 200) {
                    setData(resp.data)
                }
            } catch (e) {
                console.log(e)
            }
            // await 키워드는 axios 의 행동이 끝날때까지 기다리라는 의미
            // 반드시 비동기화 함수(async) 안에서 사용

        }
        selectOne()
    }, [])

    let onLogOut = async () => {
        let response = await axios.post('http://localhost:8080/user/logOut', {
            withCredentials: true
        })
        if (response.status === 200) {
            navigate('/')
        }
    }

    let onDelete = async () => {
        let response = await axios.get('http://localhost:8080/board/delete/' + id, {
            withCredentials: true
        })
        if (response.status === 200) {
            navigate('/board/showList/1', {state : {userInfo: userInfo}})
        }
    }
    return (
        <Container>
            <Table striped borderd hover>
                <thead>
                <tr>
                    <td colSpan={2} className={'text-end'}>
                        <Button onClick={onLogOut}>로그아웃</Button>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={2}>제목: {data.title}</td>
                </tr>
                <tr>
                    <td colSpan={2}>글번호: {data.id}</td>
                </tr>
                <tr>
                    <td colSpan={2}>작성자: {data.nickname}</td>
                </tr>
                <tr>
                    <td>작성일: {data.entryDate}</td>
                    <td>수정일: {data.modifyDate}</td>
                </tr>
                <tr>
                    <td colSpan={2}>내용</td>
                </tr>
                <tr>
                    <td colSpan={2}>작성자: {data.content}</td>
                </tr>
                {data.writerId === userInfo.id ?
                    <tr>
                        <td>
                            <Button onClick={onUpdate}>수정하기</Button>
                        </td>
                        <td>
                            <Button onClick={onDelete}>삭제하기</Button>
                        </td>
                    </tr>
                    : null}

                <tr>
                    <td colSpan={2} className={"text-center"}>
                        <Button onClick={goBack} className={"text-center"}>
                            뒤로가기
                        </Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ShowOne