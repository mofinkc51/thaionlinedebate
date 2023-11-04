import React , { useEffect , useState}from 'react'
import './FavDebateGallery.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import UserNavBarDrop from '../../components/Navbar/UserNavBarDrop'
import TopicComponent from '../../components/TopicComponent'
import { makeRequest } from '../../axios'
import { Navigate, useNavigate } from 'react-router-dom'

function FavDebateGallery() {

  const handleSortChange = (sortType) => {
    // Here, you would implement your sorting logic based on sortType
    console.log(`Sorting by: ${sortType}`);
};
  const [debate,setDebate] = useState([{
    dbt_id:"",
    dbt_title:"",
  }]);
  const navigate = useNavigate();

  const getTopTopics = async () => {
    try {
        const resFav = await makeRequest.get('/posts/fav')
        console.log(resFav.data.length);

        return setDebate(resFav.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate('/signin');
      }
      console.log(err);
    }
  }
  useEffect(() => {
    getTopTopics();
  },[]);
  return (
    <>
    <UserNavBar/>
    {/* <UserNavBarDrop/> */}
    <div className="fav-debate-gallery-page-container">
        <div className="fav-debate-gallery-title-row">
            <h2>รายการประเด็นโต้แย้งที่ชื่นชอบ</h2>
            <div className='fav-sort-component'>
              <label>จัดเรียงโดย: </label>
              <select className='fav-select' onChange={handleSortChange}>
                  <option value="">เพิ่มล่าสุด</option>
                  <option value="">ตัวอักษร ก → ฮ</option>
                  <option value="">ตัวอักษร ฮ → ก</option>
              </select>
            </div>
        </div>
        <div className="fav-debate-gallery">
        {debate.map((debate) => (
              <TopicComponent topicname={debate.dbt_title} id={debate.dbt_id}/>
            ))}
        </div>
    </div>
    </>
  )
}

export default FavDebateGallery;