import {Button, Container, Form, FormControl, Table} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

let Update = () => {
    let params = useParams();
    let id = params.id;
    let [inputs, setInputs] = useState({
        title: '',
        content: ''
    });
    let location = useLocation();
    let userInfo = location.state.userInfo
    let navaigate = useNavigate()

    let moveToNext = (id) => {
        navaigate(`/board/showOne/${id}`, {state: {userInfo: userInfo}})
    }
    let onSubmit = async (e) => {
        e.preventDefault()
        if(inputs.writerId === userInfo.id) {
            let resp = await axios.post(`http://localhost:8080/board/update`, inputs, {
                withCredentials: true
            })

            if (resp.status === 200) {
                moveToNext(resp.data.destId)
            }
           }

    }

    useEffect(() => {
        // 업데이트할 데이터를 불러오는 함수
        let getUpdate = async () => {

            let resp = await axios.get("http://localhost:8080/board/showOne/" + id, {
                withCredentials: true
            });
            if (resp.status === 200) {
                console.log(resp.data)
                setInputs(resp.data);
            }
        };
        getUpdate();
    }, []);

    let onChange = (e) => {
        let {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <td colSpan={2}>{id}번 글 수정하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
                            <FormControl
                                type={'text'}
                                name={'title'}
                                value={inputs.title}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea
                                name={'content'}
                                className={'form-control'}
                                value={inputs.content}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type={'submit'}>수정하기</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Form>

        </Container>
    );
}

export default Update;
