import React from 'react'

function SignInNavbar() {
    return (
        <>
           <nav>
                <div class="nav-container">
                    <div class="nav-wrapper">
                        <div class="logo">
                            <h3>TDBate</h3>
                        </div>
                        <ul class="nav-menu" id="myMenu">
                            <li><a href="">หน้าแรก</a></li>
                            <li><a href="/signup">ลงทะเบียน</a></li>
                            
                        </ul>
                    </div>
                </div>
            </nav> 
        </>
      )
}

export default SignInNavbar