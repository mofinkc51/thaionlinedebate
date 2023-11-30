import React , { useEffect , useState}from 'react'
import './TagDebatePage.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import UserNavBarDrop from '../../components/Navbar/UserNavBarDrop'
import TopicComponent from '../../components/TopicComponent'
import { makeRequest } from '../../axios'
import { Navigate, useNavigate } from 'react-router-dom'

function TagDebatePage(props) {
  const tagname = props.tagname;
  const [debate,setDebate] = useState([]);
  const [sortType, setSortType] = useState('recenting'); // State ใหม่สำหรับเก็บการเรียงลำดับ
  const navigate = useNavigate();
  function isThaiCharacter(text) {
    return /^[\u0E00-\u0E7F]+/.test(text);
  }
  
  function compareDescendingCustom(a, b) {
    // ตรวจสอบว่าข้อความเป็นภาษาไทยหรือไม่
    const aIsThai = isThaiCharacter(a.dbt_title);
    const bIsThai = isThaiCharacter(b.dbt_title);
    // ถ้าทั้งคู่เป็นภาษาไทย หรือ ทั้งคู่ไม่ใช่ภาษาไทย ให้เปรียบเทียบโดยใช้ localeCompare
    if ((aIsThai && bIsThai) || (!aIsThai && !bIsThai)) {
      return b.dbt_title.localeCompare(a.dbt_title, 'th'); // เรียงลำดับจาก ฮ ไป ก
    }
    // ถ้า a เป็นภาษาไทย และ b ไม่ใช่ ให้ a มาก่อน
    if (aIsThai) return -1;
    // ถ้า b เป็นภาษาไทย และ a ไม่ใช่ ให้ b มาก่อน
    if (bIsThai) return 1;
  }
  
  const handleSort = (debates, type) => {
    let sortedDebates;
    switch (type) {
      case 'ascending':
        sortedDebates = [...debates].sort((a, b) => a.dbt_title.localeCompare(b.dbt_title, 'th'));
        break;
      case 'descending':
        sortedDebates = [...debates].sort(compareDescendingCustom);
        break;
      default:
        sortedDebates = [...debates];
    }
    return sortedDebates;
  };
  
  const handleSortChange = (e) => {
    const newSortType = e.target.value;
    // บันทึกประเภทการเรียงลำดับ
    setSortType(newSortType);
    // อัพเดต state ด้วยลำดับที่เรียงใหม่
    setDebate(currentDebate => handleSort(currentDebate, newSortType));
  };


  //const tagname = window.location.pathname.split("/").pop();
  const getTagTopics = async () => {
    console.log(tagname);
    try {
      const resTag = await makeRequest.get('/posts/tag/' + tagname);
      let sortedData = handleSort(resTag.data, sortType); // 2. เรียกใช้ handleSort กับข้อมูลที่ได้
      setDebate(sortedData);
    } catch (err) {
      if (err.response.status === 401) {
        navigate('/signin');
      }
      console.log(err);
    }
  };

  const refreshTopics = () => {
    getTagTopics();
  };

  useEffect(() => {
    getTagTopics();
  }, [sortType]);

  return (
    <>
    <UserNavBar/>
    {/* <UserNavBarDrop/> */}
    <div className="fav-debate-gallery-page-container">
        <div className="fav-debate-gallery-title-row">
            <h2>#{tagname}</h2>
            <div className='fav-sort-component'>
              <label>จัดเรียงโดย: </label>
              <select className='fav-select' onChange={handleSortChange}>
                <option value="recenting">เพิ่มล่าสุด</option>
                <option value="ascending">ตัวอักษร ก → ฮ</option>
                <option value="descending">ตัวอักษร ฮ → ก</option>
            </select>
            </div>
        </div>
        <div className="fav-debate-gallery">
        {debate.map((debate) => (
              <TopicComponent 
              topicname={debate.dbt_title} 
              id={debate.dbt_id}
              refresh={refreshTopics}
              />
            ))}
        </div>
    </div>
    </>
  )
}

export default TagDebatePage;