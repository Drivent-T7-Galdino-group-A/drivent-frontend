import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useActivitiesByDate from '../../hooks/api/useActivitiesByDate';
import useLocalizations from '../../hooks/api/useLocalizations';
import { StyledTypography } from '../TicketAndPayment/index';
import List from './List';
import { useContext } from 'react';
import ReRenderContext from '../../contexts/ReRenderContext';

function formatDateToIsoString(date) {
  const formattedDate = `${date}T00:00:00.000Z`;
  return formattedDate;
}

export default function Schedule({ selectedDate, ticket }) {
  const { reRender } = useContext(ReRenderContext);
  const formattedDate = formatDateToIsoString(selectedDate);

  const { activitiesByDate: activities, getActivitiesByDate } = useActivitiesByDate(formattedDate);
  const { localizations } = useLocalizations();

  async function getDatesActivities() {
    try {
      await getActivitiesByDate();
    } catch (error) {
      toast('Não foi possível carregar as atividades!');
    }
  }

  useEffect(() => {
    getDatesActivities();
  }, [selectedDate, reRender]);

  return (
    <Wrapper className="activityWrapper">
      {localizations?.map((localization, index) => (
        <Localization
          key={index}
          localizationsLength={localizations.length}
          localization={localization}
          activities={activities}
          localizationId={localization.id}
          selectedDate={selectedDate}
          ticket={ticket}
        />
      ))}
    </Wrapper>
  );
}

function Localization({
  localizationsLength,
  localization,
  activities,
  localizationId,
  selectedDate,
  ticket,
}) {
  return (
    <Container quantityOfLocalizations={localizationsLength}>
      <StyledTypography variant="h6">{localization.name}</StyledTypography>
      <List
        activities={activities}
        localizationId={localizationId}
        selectedDate={selectedDate}
        ticket={ticket}
      />
    </Container>
  );
}

const Wrapper = styled.div`
  height: 85%;
  margin: 60px 0;

  display: flex;

  & > div:last-child > div:last-child {
    border-right: solid 1px #d7d7d7;
  }
`;

const Container = styled.div`
  width: ${(props) => (props.quantityOfLocalizations ? Math.round(100 / props.quantityOfLocalizations) : 0)}%;
  height: 80%;
`;
