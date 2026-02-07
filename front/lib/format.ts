import moment from "moment";

export const formatDate = (date: Date) => moment(date).format("YYYY년 MM월 DD일 HH:mm");