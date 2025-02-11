import { useNavigate } from 'react-router-dom';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';

import uws from '@public/data/underwriters.json';
import '@src/assets/global.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='m-14'>

        <h1 className='mb-5 text-2xl font-bold'>Underwriter</h1>
        <div className="flex flex-wrap gap-4 items-center">

          {
            uws.map((uw, index) => (
              <Button key={index} color='primary' onPress={() => navigate(`/uw/${uw}`)}>
                {uw}
              </Button>
            ))
          }
        </div>

        <div className="mt-14 border p-4 rounded-lg shadow">
          <h1 className='text-lg font-bold'>Disclaimer:</h1>
          <p className='text-justify'>
            This website displays data related to Initial Public Offerings (IPOs) in Indonesia. The information is manually collected from a variety of sources, and while we strive to ensure accuracy, please note that the data may not always be up-to-date or fully accurate due to potential discrepancies in the source materials. This application has been created as an open-source project, and we welcome any contributions to improve the quality of the data. If you notice any inaccuracies or have suggestions for improvements, feel free to submit a pull request through the GitHub repository for this website. Your help in enhancing the accuracy and usefulness of this project is greatly appreciated!
          </p>

          <p className='mt-2 text-justify'>
            Any decisions made based on the information provided on this website are at your own risk. The data presented here is for informational purposes only and may not be entirely accurate or up-to-date. We are not responsible for any financial losses, damages, or other consequences that may result from the use of this data. Please verify all information independently before making any decisions. The website does not offer financial advice or recommendations. By using this site, you agree that we are not liable for any errors, omissions, or inaccuracies in the data provided.
          </p>

          <div className='mt-5'>
            <a href="https://github.com">
              <Avatar size="md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdZlszhihSfJBfoXkpJtOvDk9p_sskS4rSQ&s" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;