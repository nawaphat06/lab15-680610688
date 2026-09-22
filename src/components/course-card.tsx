import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onUnenroll?: (courseId: string) => void;
};

//แปลงวันที่เป็นภาษาไทย พ.ศ."
function formatThaiDateTime(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function CourseCard({
  course,
  student,
  enrolledAt,
  onUnenroll,
}: CourseCardProps) {
  const isEnrolled = Boolean(enrolledAt);

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{course.courseTitle}</CardTitle>
            <CardDescription>
              รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
              {course.instructors.join(", ")}
            </CardDescription>
          </div>

          {/* 2.2 และ 3 */}
          {isEnrolled ? (
            <Badge
              variant="secondary"
              className="border-none bg-amber-100 text-amber-900 dark:bg-purple-900/40 dark:text-purple-300"
            >
              ลงทะเบียนแล้ว
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="border-none bg-purple-100 text-purple-900 dark:bg-amber-900/40 dark:text-amber-300"
            >
              เปิดรับ
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* 2.3 */}
      {isEnrolled && (
        <CardContent className="flex items-end justify-between pt-0">
          <div className="space-y-0.5 text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatThaiDateTime(enrolledAt)}</p>
          </div>

          {/*1.3*/}
          {onUnenroll && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUnenroll(course.courseId)}
              aria-label="ยกเลิกการลงทะเบียน"
            >
              <Trash2 className="h-4 w-4 text-destructive hover:text-destructive" />
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}
