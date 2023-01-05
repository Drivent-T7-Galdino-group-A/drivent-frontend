import styled from 'styled-components';
import dayjs from 'dayjs';
import { CgEnter, CgCheckO, CgCloseO } from 'react-icons/cg';

function filterActivitiesByLocalization({ activities, localizationId }) {
  const filteredActivities = activities?.filter(activity => activity.Localization.id === localizationId);
  return filteredActivities;
}

function sortActivitiesByTime(activities) {
  activities?.sort((a, b) =>
    dayjs(a.startTime).diff(dayjs(b.startTime))
  );
}

function differenceBetweenDatesInHours({ startTime, endTime }) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const difference = end.diff(start, 'hour', true);
  return difference;
}

export default function List({ activitiesFromDay, localizationId }) {
  const filteredActivities = filterActivitiesByLocalization({ activities: activitiesFromDay, localizationId });
  sortActivitiesByTime(filteredActivities);

  return (
    <Wrapper>
      {
        filteredActivities?.map(activity =>
          <Lecture
            quantityOfHours={differenceBetweenDatesInHours(activity)}
          >
            <div>
              <div>{activity.name}</div>
              <div>{activity.startTime.slice(11, 16)} - {activity.endTime.slice(11, 16)}</div>
            </div>
            <div>
              <div>
                <CgCloseO
                  color='#CC6666'
                  size='16px'
                />
              </div>
              <div>Esgotado</div>
            </div>
          </Lecture >
        )
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  border: solid 1px #D7D7D7;
  border-right: none;
`;

const Lecture = styled.div`
  width: 90%;
  height: ${props => 90 * props.quantityOfHours - 10}px;
  margin: 10px 5%;
  padding: 10px 3%;
  background-color: #F1F1F1;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;

  font-family: 'Roboto';

  > div:nth-child(1) {
    font-size: 12px;
    line-height: 14px;
    color: #343434;

    > div:nth-child(1) {
      font-weight: 700;
    }

    > div:nth-child(2) {
      margin-top: 5px;
      font-weight: 400;
    }
  }

  > div:nth-child(2) {
    width: 65px;
    min-width: 65px;
    height: ${props => 90 * props.quantityOfHours - 30}px;
    border-left: 1px solid #CFCFCF;
  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:nth-child(2) {
      font-weight: 400;
      font-size: 9px;
      line-height: 11px;
      color: #CC6666;
    }
  }
`;
