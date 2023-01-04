import styled from 'styled-components';
import { CgEnter, CgCloseO } from 'react-icons/cg';
import { StyledTypography } from '../TicketAndPayment/index';

function filterLocalizations(activities) {
  const allLocalizations = activities?.map(activity => ({ ...activity.Localization }));

  const allLocalizationIds = allLocalizations?.map(localization => localization.id);

  const filteredLocalizations = allLocalizations?.filter((localization, index) =>
    allLocalizationIds.indexOf(localization.id) === index
  );

  return filteredLocalizations;
}

function filterActivitiesByLocalization({ activities, localizationId }) {
  const filteredActivities = activities?.filter(activity => activity.Localization.id === localizationId);
  return filteredActivities;
}

function sortActivitiesByTime(activities) {
  activities?.sort((a, b) =>
    (new Date(a.startTime)).getTime() - (new Date(b.startTime)).getTime()
  );
}

function List({ activitiesFromDay, localizationId }) {
  const filteredActivities = filterActivitiesByLocalization({ activitiesFromDay, localizationId });
  sortActivitiesByTime(filteredActivities);

  return (
    <>
      {
        filteredActivities?.map(activity =>
          <Lecture>
            <div>
              <div>{activity.name}</div>
              <div>{activity.startTime.slice(11, 16)} - {activity.endTime.slice(11, 16)}</div>
            </div>
            <div></div>
            <div>
              <span></span>
            </div>
          </Lecture >
        )
      }
    </>
  );
}

export default function Schedule({ selectedDate, activities }) {
  const activitiesFromDay = activities?.filter(activity => activity.date.slice(0, 10) === selectedDate);
  const localizations = filterLocalizations(activities);

  return (
    <Wrapper quantityOfLocalizations={localizations?.length}>
      {localizations?.map((localization, index) => (
        <Localization key={index}>
          <StyledTypography variant="h6">{localization.name}</StyledTypography>
          <List />
        </Localization>
      ))
      }
    </Wrapper >
  );
}

const Wrapper = styled.div`
  height: 85%;
  margin: 60px 0;
  
  display: flex;

  & > div {
    width: ${props => props.quantityOfLocalizations ? Math.round(100 / props.quantityOfLocalizations) : 0}%;
    height: 80%;
  }

  & > div > div {
    height: 100%;
    border: solid 1px #D7D7D7;
    border-right: none;
  }

  & > div:last-child > div:last-child {
    border-right: solid 1px #D7D7D7;
  }
`;

const Localization = styled.div`

`;

const Lecture = styled.div`

`;
