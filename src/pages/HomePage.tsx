import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-6 p-4">
      <Card className="border border-black p-6 dark:border-white/20">
        <CardContent className="space-y-4 p-0">
          <h1 className="text-xl font-semibold">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </h1>
          <Link to="/enrollment">
            <Button className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black">
              ไปหน้าลงทะเบียนเรียน
            </Button>
          </Link>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        จัดทำโดย Nawapat Prompong รหัสนักศึกษา 680610688
      </p>
    </div>
  );
}
