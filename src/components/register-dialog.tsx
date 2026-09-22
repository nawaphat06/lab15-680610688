import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
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

  const availableCourses = useMemo(() => {
    return courses.filter(
      (course) => !enrolledCourseIds.includes(course.courseId),
    );
  }, [enrolledCourseIds]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
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

  const selectedCourse = courses.find((c) => c.courseId === selectedCourseId);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden bg-card border-border">
        <div className="p-6 pb-5 space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <form id="enroll-form" onSubmit={handleSubmit} className="space-y-3">
            {/* 1 เลือกวิชา */}
            <div className="space-y-1.5">
              <Label htmlFor="course-select">วิชา</Label>
              <Select
                value={selectedCourseId}
                onValueChange={(val) => setSelectedCourseId(val ?? "")}
              >
                <SelectTrigger
                  id="course-select"
                  className="w-full bg-background border-input"
                >
                  <SelectValue placeholder="เลือกวิชา">
                    {selectedCourse ? (
                      <span className="block max-w-[340px] truncate text-left">
                        {selectedCourse.courseId} - {selectedCourse.courseTitle}
                      </span>
                    ) : undefined}
                  </SelectValue>
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
              <Label htmlFor="time-input">เวลา</Label>
              <Input
                id="time-input"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="bg-background border-input"
              />
            </div>

            {/* 3 ชื่อ นศ. readOnly */}
            <div className="space-y-1.5">
              <Label htmlFor="student-name">ชื่อ นศ.</Label>
              <Input
                id="student-name"
                value={`${currentStudent.firstName} ${currentStudent.lastName}`}
                readOnly
                className="bg-background/60 border-input cursor-not-allowed text-muted-foreground"
              />
            </div>

            {/* 4 โปรแกรม */}
            <div className="space-y-1.5">
              <Label htmlFor="student-program">โปรแกรม</Label>
              <Input
                id="student-program"
                value={currentStudent.program}
                readOnly
                className="bg-background/60 border-input cursor-not-allowed text-muted-foreground"
              />
            </div>
          </form>
        </div>

        <div className="border-t border-border bg-muted/40 dark:bg-[rgb(36,36,36)] px-6 py-4 flex justify-end">
          <Button
            type="submit"
            form="enroll-form"
            disabled={!selectedCourseId}
            className="bg-neutral-600 hover:bg-neutral-700 text-white dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300 disabled:opacity-50"
          >
            ยืนยันการลงทะเบียน
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
