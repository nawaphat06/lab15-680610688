import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  //
  const [studentEnrollments, setStudentEnrollments] = useState<Enrollment[]>(
    initialEnrollments.filter((e) => e.studentId === currentStudent.studentId),
  );

  // กดยกเลิกวิชา
  const handleUnenroll = (courseId: string) => {
    setStudentEnrollments((prev) =>
      prev.filter((e) => e.courseId !== courseId),
    );
  };

  // ลงทะเบียนสำเร็จ
  const handleEnrollSuccess = (courseId: string, timeString: string) => {
    const today = new Date();
    const [hours, minutes] = timeString.split(":");
    today.setHours(Number(hours) || 0, Number(minutes) || 0, 0);

    const newEnrollment: Enrollment = {
      studentId: currentStudent.studentId,
      courseId: courseId,
      enrolledAt: today.toISOString(),
    };

    setStudentEnrollments((prev) => [...prev, newEnrollment]);
  };

  return (
    <div className="space-y-6">
      {/* */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            {currentStudent.firstName} {currentStudent.lastName} (
            {currentStudent.studentId})
          </p>
        </div>

        {/* ลงทะเบียน */}
        <RegisterDialog
          enrolledCourseIds={studentEnrollments.map((e) => e.courseId)}
          onEnrollSuccess={handleEnrollSuccess}
        />
      </div>

      {/*Course Cards */}
      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          //
          const enrollment = studentEnrollments.find(
            (e) => e.courseId === course.courseId,
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt}
              onUnenroll={handleUnenroll}
            />
          );
        })}
      </div>
    </div>
  );
}
