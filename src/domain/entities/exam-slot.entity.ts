interface ExamSlotProps {
  id?: string;
  date: Date;
  time: string;
  totalSeats: number;
  bookedSeats: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ExamSlot {
  id?: string;
  date: Date;
  time: string;
  totalSeats: number;
  bookedSeats: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: ExamSlotProps) {
    this.id = props.id;
    this.date = props.date;
    this.time = props.time;
    this.totalSeats = props.totalSeats;
    this.bookedSeats = props.bookedSeats;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
  public hasAvailableSeats(): boolean {
    return this.bookedSeats < this.totalSeats;
  }

  public bookSeat(): void {
    this.bookedSeats++;
  }
  public isFull(): boolean {
    return this.bookedSeats >= this.totalSeats;
  }
}
