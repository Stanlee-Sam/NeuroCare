

const activities = [
    {
        id : 1,
        mood : "Happy",
        emoji : "🙂",
        date : "12/12/2024",
        time : "12:00 PM",
        entry : "Had an amazing day",
    },
    {
        id : 2,
        mood : "Stressed",
        emoji : "😟",
        date : "13/12/2024",
        time : "13:00 PM",
        entry : "Overwhelmed with deadlines",
    }
]
const Activity = () => {
  return (
    <div className='flex flex-col gap-4 '>
        <div>
            <h1 className='text-center font-bold pt-2'>Recent Activity</h1>
        </div>
      {activities.map(activity => (
        <div key={activity.id} className='bg-gray-300 p-4 rounded-lg flex flex-col gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:shadow-xl'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-[17px]'>{activity.mood}</h1>
                    <p>({activity.emoji})</p>
                </div>
                <div className='flex justify-evenly gap-1'>
                    <h1 className='font-bold text-[15px]'>{activity.date}</h1>
                    <h1 className='font-bold text-[15px]'>{activity.time}</h1>
                </div>

            </div>
            <div>
                <p className='text-[15px]'>&quot;{activity.entry}&quot;</p>
            </div>
            <div className='flex justify-between'>
                <button className='rounded-lg bg-[#608BC1] p-2 text-[15px] font-bold w-[90px] hover:bg-[#77DD77] hover:text-white'>Edit</button>
                <button className='rounded-lg bg-[#dd0707] p-2 text-[15px] font-bold w-[90px] hover:bg-[#f70303] hover:text-white'>Delete</button>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Activity
