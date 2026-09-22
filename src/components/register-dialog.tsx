import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { courses, currentStudent } from "@/lib/mock-data";

type RegisterDialogProps = {
  enrolledCourseIds: string[];
  onEnrollSuccess: (courseId: string, timeString: string) => void;
};

// ดึงเวลาปัจจุบันในรูปแบบ "HH:mm"
function getCurrentTimeString() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function RegisterDialog({
  enrolledCourseIds,
  onEnrollSuccess,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeString);

  // 1.2
  const availableCourses = useMemo(() => {
    return courses.filter(
      (course) => !enrolledCourseIds.includes(course.courseId),
    );
  }, [enrolledCourseIds]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      //
      setSelectedTime(getCurrentTimeString());
      setSelectedCourseId("");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCourseId) return;

    onEnrollSuccess(selectedCourseId, selectedTime);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* 1.1 */}
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          {/* 1 เลือกวิชา */}
          <div className="space-y-1.5">
            <Label htmlFor="course-select">วิชา</Label>
            <Select
              value={selectedCourseId}
              onValueChange={setSelectedCourseId}
            >
              <SelectTrigger id="course-select" className="w-full">
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent side="bottom" align="start" sideOffset={4}>
                {availableCourses.length === 0 ? (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    ลงทะเบียนครบทุกวิชาแล้ว
                  </div>
                ) : (
                  availableCourses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      {course.courseId} - {course.courseTitle}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* 2 เลือกเวลา */}
          <div className="space-y-1.5">
            <Label htmlFor="time-input">เลือกเวลา</Label>
            <Input
              id="time-input"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </div>

          {/* 3 ชื่อ นศ. readOnl */}
          <div className="space-y-1.5">
            <Label htmlFor="student-name">ชื่อ นศ.</Label>
            <Input
              id="student-name"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          </div>

          {/* 4 โปรแกรม */}
          <div className="space-y-1.5">
            <Label htmlFor="student-program">โปรแกรม</Label>
            <Input
              id="student-program"
              value={currentStudent.program}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          </div>

          {/* 5 ปุ่มยืนยันการลงทะเบียน (disabled จนกว่าจะเลือกวิชา) */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={!selectedCourseId}
            >
              ยืนยันการลงทะเบียน
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
