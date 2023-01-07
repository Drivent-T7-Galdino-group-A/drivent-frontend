import styled from 'styled-components';
import { StyledTypography } from '../TicketAndPayment/index';
import List from './List';

function filterLocalizations(activities) {
  const allLocalizations = activities?.map(activity => ({ ...activity.Localization }));

  const allLocalizationIds = allLocalizations?.map(localization => localization.id);

  const filteredLocalizations = allLocalizations?.filter((localization, index) =>
    allLocalizationIds.indexOf(localization.id) === index
  );

  return filteredLocalizations;
}

export default function Schedule({ selectedDate, activities }) {
  const activitiesFromDay = activities?.filter(activity => activity.date.slice(0, 10) === selectedDate);
  const localizations = filterLocalizations(activities);

  return (
    <Wrapper >
      {localizations?.map((localization, index) => (
        <Localization
          key={index}
          quantityOfLocalizations={localizations?.length}
        >
          <StyledTypography variant="h6">{localization.name}</StyledTypography>
          <List
            activitiesFromDay={activitiesFromDay}
            localizationId={localization.id}
            selectedDate={selectedDate}
          />
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

  & > div:last-child > div:last-child {
    border-right: solid 1px #D7D7D7;
  }
`;

const Localization = styled.div`
  width: ${props => props.quantityOfLocalizations ? Math.round(100 / props.quantityOfLocalizations) : 0}%;
  height: 80%;
`;
