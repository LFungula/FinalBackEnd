-- CreateTable
CREATE TABLE "_AmenitiesToProperty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AmenitiesToProperty_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AmenitiesToProperty_B_index" ON "_AmenitiesToProperty"("B");
