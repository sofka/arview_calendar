import EventItem from '../EventItem';
import eventTypes from '../../eventTypes';
import s from './style.module.css';

const EventList = ({ events, handleClickEdit, handleClickRemove }) => {

    return (
        <ul className={s.list}>
            {
                events.map(item => {
                    switch (item.type) {
                        case eventTypes.holiday: {
                            return <EventItem
                                key={item.guid}
                                guid={item.guid}
                                name={item.name}
                                money={item.money}
                                onEventEdit={handleClickEdit}
                                onEventRemove={handleClickRemove}
                                type={item.type}
                            />

                        }

                        case eventTypes.event: {
                            return <EventItem
                                key={item.guid}
                                guid={item.guid}
                                name={item.name}
                                address={item.address}
                                time={item.time}
                                onEventEdit={handleClickEdit}
                                onEventRemove={handleClickRemove}
                                type={item.type} />
                        }
                        case eventTypes.remark:
                        default: {
                            return <EventItem
                                key={item.guid}
                                guid={item.guid}
                                name={item.name}
                                remark={item.remark}
                                onEventEdit={handleClickEdit}
                                onEventRemove={handleClickRemove}
                                type={item.type} />

                        }
                    }
                }
                )
            }
        </ul>
    )


}
export default EventList;