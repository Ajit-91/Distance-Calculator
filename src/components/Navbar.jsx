import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='container bg-white px-5 mb-3 w-full' >
        <Image src='/Graviti-Logo.png' width={130} height={130}  />
    </div>
  )
}

export default Navbar