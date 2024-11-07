import {NextResponse} from "next/server";
import dbConnect from "@/lib/db_con";
import Category  from "@/models/CategoryModel";

export async function PUT(req , {params}) {
    const {categoryId} = params;
    const {   name } = await req.json();
    dbConnect();

    if (!categoryId || !name || name.trim() === '') {
        return NextResponse.json({ message: 'ID and category name are required' }, { status: 400 });
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true }).exec();
        if (!updatedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Category updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(req , {params}) {
    const {categoryId} = params;
    dbConnect();

    if (!categoryId) {
        return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
    }

    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId).exec();
        if (!deletedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete category' }, { status: 500 });
    }
}