import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1Content = (props) => {
  console.log("From PageContent1..");
  console.log(props.users);
  
  return (
    <div className='pb-16 pt-6 flex gap-10 items-center px-18 h-[90vh]'>
      <LeftContent/>
      <RightContent users={props.users}/>
    </div>
  )
}

export default Page1Content
