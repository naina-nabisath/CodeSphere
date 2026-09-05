import { ArrowRightCircle, PlayCircle, Star } from 'lucide-react'
import './Banner.css'
import Student from '../../../assets/Student-photo.png'
import js from '../../../assets/Javascript.png'
import Certificate from '../../../assets/certificate.png'

function Banner() {
    return (
        <div className='banner'>
            <div className='banner-container'>
                <div>
                    <div className="banner-badge">
                        <Star size={40} />
                        <h1>Learn Without Limits</h1>
                    </div>
                    <div className='banner-heading'>
                        <h1>Learn. Build. Grow</h1>
                        <h2>Grow Your Future</h2>
                    </div>
                    <div className='banner-subheading'>
                        <h3>Gain in-demand skills with expert-led courses, <br></br> real-world
                            projects, and industry-recognized certifications.</h3>
                    </div>
                    <div className="banner-button">
                        <button className="explore">Explore Courses <ArrowRightCircle size={60} /></button>
                        <button className="watch">Watch Demo <PlayCircle size={60} /></button>
                    </div>
                </div>
                <div className="banner-photos">
                    <img src={Student} alt="Student" />
                    <div className='banner-adds1'>
                        <div className='banner-adds1-img'>
                            <img src={js} alt="Javascript" />
                        </div>
                        <div className='banner-adds1-writing'>
                            <h5>Full Stack Web Development</h5>
                            <button className='border-2 text-sm'>Beginner</button>
                            <div className='flex'>
                                <Star size={20} /> <h6>4.8 (120 Reviews)</h6>
                            </div>
                        </div>
                    </div>
                    <div className='banner-adds2'>
                        <div>
                            <img src={Certificate} alt="Javascript" />
                        </div>
                        <div>
                            <h5>Certificate of Completion</h5>
                        </div>
                    </div>
                    <div className='banner-adds3'>
                        <div>
                            <h5 className='text-green-600'>Your progress</h5>
                            <div className='flex justify-center'>
                                <progress value={30} max={100} className='border rounded'></progress>
                            </div>
                            <h5>Keep Learning!</h5>
                        </div>
                    </div>
                    <div className='banner-adds4'>
                        <div>
                            <h5>Career Path</h5>
                            <h4>Full Stack Developer</h4>
                            <h5>12 Courses .8 Projects</h5>
                        </div>
                    </div>
                </div>
            </div><div className="banner-poster">
                <div className="poster-item">
                    <div className="poster-icon">
                        {/* Add your video icon/image here */}
                    </div>
                    <h1>2 Free Videos for Every Course</h1>
                </div>

                <div className="poster-item">
                    <div className="poster-icon">
                        {/* Add your expert icon/image here */}
                    </div>
                    <h1>Learn from Expert Instructors</h1>
                </div>

                <div className="poster-item">
                    <div className="poster-icon">
                        {/* Add your course icon/image here */}
                    </div>
                    <h1>Pay & Access Full Courses</h1>
                </div>

                <div className="poster-item">
                    <div className="poster-icon">
                        {/* Add your certificate icon/image here */}
                    </div>
                    <h1>Certificate of Completion</h1>
                </div>
            </div>
        </div>

    )
}

export default Banner