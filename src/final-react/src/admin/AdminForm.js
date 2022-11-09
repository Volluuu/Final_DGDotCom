import './userTable.css';
import { useParams} from "react-router-dom";
import DashBoard from "./DashBoard";
import UserInfo from "./UserInfo";
import AdProduct from "./AdProduct";
import Shipping from "./Shipping";
import Cs from "./Cs";
import Banner from "./Banner";

function AdminForm(props) {
    const {path}=useParams();
    // //유저리스트 호출
    // const [userlist,setUserlist] = useState([]);
    // // console.log(userlist);
    //
    // const ulist = () => {
    //     let ulistUrl = localStorage.url + "/admin/userList";
    //     axios.get(ulistUrl)
    //         .then(res => {
    //             setUserlist(res.data);
    //             console.dir(res.data)
    //         });
    // }
    //
    // useEffect(() => {
    //     ulist();
    // },[]);

    //페이징

    // const navi = useNavigate();
    // const {currentPage} = useParams();
    // console.log("currentPage="+currentPage);
    // const [data,setData] = useState('');
    //
    // const userpageList = () => {
    //     let url = localStorage.url+"/admin/userpagelist?currentPage="+currentPage;
    //     axios.get(url)
    //         .then(res => {
    //             setData(res.data);
    //             console.log(res.data);
    //         })
    // }
    //
    // //currentPage 값이 변경될때마다 함수 다시 호출
    // useEffect(()=>{
    //     userpageList();
    // },[currentPage])

    return (
        <div>
            <div id='wrapper' style={{width:'100%'}}>
                {/*사이드바 시작, 사이드바 색깔 변경가능*/}
                <ul className='navbar-nav sidebar sidebar-dark accordion' id='accordionSidebar'
                    style={{backgroundColor: 'mediumpurple'}}>
                    {/* 로고*/}
                    <a className='sidebar-brand d-flex align-items-center justify-content-center' href='./admin'>
                        <img alt='#' src='../logo192.png' style={{width: '80px', height: '80px'}}/>
                    </a>

                    {/*로고 아래*/}
                    <hr className='sidebar-divider my-0'/>

                    {/*사이드바 메뉴*/}
                    <div className="sidebar-heading" style={{fontSize: '24px'}}>
                        Menu
                    </div>

                    <li className='nav-item active'>
                        <a className='nav-link' href='./dashboard' data-target="#collapseTwo"
                           aria-expanded="true" aria-controls="collapseTwo">
                            {/*회원관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>대쉬보드</span>
                        </a>
                    </li>

                    <li className='nav-item active'>
                        <a className='nav-link' href='./userinfo' data-target="#collapseTwo"
                           aria-expanded="true" aria-controls="collapseTwo">
                            {/*회원관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>회원관리</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="./adproduct" data-target="#collapseUtilities"
                           aria-expanded="true" aria-controls="collapseUtilities">
                            {/*상품관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>상품관리</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="./shipping" data-target="#collapseUtilities"
                           aria-expanded="true" aria-controls="collapseUtilities">
                            {/*배송관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>배송관리</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="./banner" data-target="#collapseUtilities"
                           aria-expanded="true" aria-controls="collapseUtilities">
                            {/*배너관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>배너관리</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="./cs" data-target="#collapseUtilities"
                           aria-expanded="true" aria-controls="collapseUtilities">
                            {/*고객센터 아이콘 넣기~!~!!~!!~~!*/}
                            <span>고객센터</span>
                        </a>
                    </li>

                </ul>
                {/*사이드바 끝*/}

                {/*상단 바 시작, 상단 바 색깔을 nav태그에서 변경 가능*/}
                <div id='content-wrapper' className='d-flex flex-column'>
                    <div id='content'>
                        <nav className='navbar navbar-expand navbar-light topbar mb-4 static-top shadow'
                             style={{backgroundColor: 'mediumpurple'}}>

                            {/*상단 바 우측 관리자 이름 표시*/}
                            <ul className="navbar-nav ml-auto">
                                {/*관리자 이름 좌측 | 표시*/}
                                <div className="topbar-divider d-none d-sm-block"></div>

                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="src/final-react/src/home/AdminForm#" id="userDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa-solid fa-address-card"></i>&nbsp;
                                        <span className="mr-2 d-none d-lg-inline large"
                                              style={{color: 'white'}}>관리자</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <br/>
                        {
                            path==="dashboard" &&
                            <DashBoard/>
                        }

                        {
                            path==="userinfo" &&
                            <UserInfo/>
                        }
                        {
                            path==="adproduct" &&
                            <AdProduct/>
                        }
                        {
                            path==="shipping" &&
                            <Shipping/>
                        }
                        {
                            path==="cs" &&
                            <Cs/>
                        }
                        {
                            path==="banner" &&
                            <Banner/>
                        }

                    </div>
                </div>


            </div>
        </div>
    );
}

export default AdminForm;