import React from 'react'

function SignInNavbar() {
    return (
        <>
           <nav>
                <div class="nav-container">
                    <div class="nav-wrapper">
                        <div class="logo">
                        <a href="/"><h3>Thai Online Debate</h3></a>
                        </div>
                        <ul class="nav-menu" id="myMenu">
                            <li><a href="/">หน้าแรก</a></li>
                            <li><a href="/signup">ลงทะเบียน</a></li>
                            
                        </ul>
                    </div>
                </div>
            </nav> 
        </>
      )
}

export default SignInNavbar