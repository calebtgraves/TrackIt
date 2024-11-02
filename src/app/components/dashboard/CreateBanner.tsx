import Image from 'next/image';
type prop = {
  src: string;
  color: string;
  backgroundColor: string;
  text: string;
};
export default function CreateBanner({
  src,
  color,
  backgroundColor,
  text,
}: prop) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-b-xl ${backgroundColor} ${color} py-5`}
    >
      <div className='my-5 flex w-full flex-row items-center justify-center'>
        <div className='ml-[5%]'>
          <Image src={src} width={50} height={50} alt='logo' />
        </div>
        <div className='mx-auto mr-[5%] w-full'>
          <h1 className='text-center font-title text-3xl md:text-4xl lg:text-5xl'>
            {text}
          </h1>
        </div>
      </div>
    </div>
  );
}
